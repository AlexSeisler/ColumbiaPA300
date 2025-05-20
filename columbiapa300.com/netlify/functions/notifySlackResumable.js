const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { fileName, mimeType } = JSON.parse(event.body);

    const slackMessage = {
      text: `🗂️ *Large File Uploaded*\n📁 ${fileName} (${mimeType})\n📍Uploaded via resumable link (check Drive manually for details)`
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
    console.error("❌ Slack Notify Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
