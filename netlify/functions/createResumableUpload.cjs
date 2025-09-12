/**
 * Netlify Function: createResumableUpload
 * Initializes a Google Drive resumable upload session.
 * Used for large community media uploads (images/videos).
 */

const { google } = require("googleapis");
const fetch = require("node-fetch");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "CORS OK",
    };
  }

  try {
    const { name, mimeType } = JSON.parse(event.body || "{}");

    if (!name || !mimeType) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: "Missing file name or type" }),
      };
    }

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, "base64").toString("utf8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();

    const metadata = {
      name,
      mimeType,
      parents: [process.env.DRIVE_FOLDER_ID],
    };

    const uploadRes = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.token || accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
          "X-Upload-Content-Type": mimeType,
        },
        body: JSON.stringify(metadata),
      }
    );

    const uploadUrl = uploadRes.headers.get("location");

    if (!uploadUrl) {
      throw new Error("Google Drive did not return resumable URL");
    }

    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📤 *Resumable Upload Started* \n📁 ${name} (${mimeType})`,
          }),
        });
      } catch (err) {
        console.warn("Slack webhook failed:", err.message);
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, uploadUrl }),
    };
  } catch (err) {
    console.error("Resumable upload init error:", err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: "Upload init failed" }),
    };
  }
};
