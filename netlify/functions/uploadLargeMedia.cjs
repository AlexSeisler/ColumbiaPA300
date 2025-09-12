/**
 * Netlify Function: uploadLargeMedia
 * Handles proxy uploads of large media files to Google Drive.
 * Provides Slack notifications for tracking.
 */

const { google } = require("googleapis");
const { Readable } = require("stream");
const fetch = require("node-fetch");

exports.config = {
  bodyParser: false, // Required to stream large files
};

exports.handler = async function (event) {
  try {
    const fileName = event.headers["x-file-name"];
    const contentType =
      event.headers["content-type"] || event.headers["Content-Type"];

    if (!fileName || !contentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing file name or content type" }),
      };
    }

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, "base64").toString("utf8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth: await auth.getClient() });

    const buffer = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : Buffer.from(event.body);

    const uploadRes = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: contentType,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: contentType,
        body: Readable.from(buffer),
      },
    });

    const fileId = uploadRes.data.id;

    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📤 *Large Media Uploaded* \n📁 ${fileName} (${contentType}) \n✅ Stored in Drive`,
          }),
        });
      } catch (err) {
        console.warn("Slack notification failed:", err.message);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId }),
    };
  } catch (err) {
    console.error("Large media upload error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Upload failed" }),
    };
  }
};
