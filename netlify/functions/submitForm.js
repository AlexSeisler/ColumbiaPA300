/**
 * Netlify Function: submitForm
 * Handles student logo submissions for ColumbiaPA300.
 * Stores metadata in Airtable, uploads to Google Drive, and notifies Slack.
 */

const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  const {
    AIRTABLE_SUBMISSIONS_TOKEN,
    AIRTABLE_SUBMISSIONS_BASE_ID,
    AIRTABLE_SUBMISSIONS_TABLE,
    SLACK_WEBHOOK_URL,
  } = process.env;

  if (!AIRTABLE_SUBMISSIONS_TOKEN || !AIRTABLE_SUBMISSIONS_BASE_ID || !AIRTABLE_SUBMISSIONS_TABLE) {
    console.error("Missing Airtable credentials in environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Server misconfiguration" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { email, name, school, grade, agreement, fileId } = body;

    if (!email || !name || !school || !grade || !fileId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing required fields" }),
      };
    }

    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const airtablePayload = {
      fields: {
        Email: email,
        "Full Name": name,
        School: school,
        Grade: grade,
        Agreement: !!agreement,
        "File Upload": [{ url: fileUrl }],
      },
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_SUBMISSIONS_BASE_ID}/${AIRTABLE_SUBMISSIONS_TABLE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_SUBMISSIONS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtablePayload),
      }
    );

    const airtableData = await response.json();

    if (!response.ok) {
      console.error("Airtable rejected the request:", airtableData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, message: "Submission failed" }),
      };
    }

    if (SLACK_WEBHOOK_URL) {
      const slackMessage = {
        text: `🎨 *New Logo Submission* \n👤 ${name} (${email}) \n🏫 ${school} – Grade ${grade} \n📎 <${fileUrl}|View Uploaded Logo>`,
      };

      await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackMessage),
      });
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ success: true, record: airtableData }),
    };
  } catch (error) {
    console.error("Submission error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Internal server error" }),
    };
  }
};
