/**
 * Netlify Function: notifySlackResumable
 * Sends Slack notification when a large file is uploaded via resumable flow.
 */

const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { fileName, mimeType } = JSON.parse(event.body || "{}");

    if (!fileName || !mimeType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing required fields" }),
      };
    }

    if (!process.env.SLACK_WEBHOOK_URL) {
      console.error("Missing SLACK_WEBHOOK_URL in environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Server misconfiguration" }),
      };
    }

    const slackMessage = {
      text: `🗂️ *Large File Uploaded* \n📁 ${fileName} (${mimeType}) \n📍 Uploaded via resumable link (check Drive manually for details)`,
    };

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Slack Notify Error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Internal server error" }),
    };
  }
};
