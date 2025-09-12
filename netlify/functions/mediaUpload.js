/**
 * Netlify Function: mediaUpload
 * Handles community media uploads for ColumbiaPA300.
 * Uploads files to Google Drive and notifies Slack.
 */

const { google } = require("googleapis");
const { Readable } = require("stream");
const fetch = require("node-fetch");
const { getTargetFolder } = require("./driveRouter.js");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-file-name, x-upload-type",
};

exports.config = {
  bodyParser: false,
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "CORS OK",
    };
  }

  try {
    const contentType =
      event.headers["content-type"] ||
      event.headers["Content-Type"] ||
      "application/octet-stream";

    const fileName = event.headers["x-file-name"] || `upload-${Date.now()}`;
    const uploadType = event.headers["x-upload-type"] || null;

    // Basic validation for file types
    if (!contentType.startsWith("image/") && !contentType.startsWith("video/")) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: "Invalid file type" }),
      };
    }

    const buffer = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : Buffer.from(event.body);

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, "base64").toString("utf8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth: await auth.getClient() });

    const parentFolder = getTargetFolder(contentType, fileName, uploadType);

    const uploadRes = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: contentType,
        parents: [parentFolder || process.env.DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: contentType,
        body: Readable.from(buffer),
      },
    });

    const fileId = uploadRes.data.id;
    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    if (process.env.SLACK_WEBHOOK_URL) {
      const slackBody = {
        text: `📸 New media submission: *${fileName}*\n<${fileUrl}|View on Drive>`,
      };

      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackBody),
      });
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, fileId, fileUrl }),
    };
  } catch (err) {
    console.error("Media upload error:", err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: "Upload failed" }),
    };
  }
};
