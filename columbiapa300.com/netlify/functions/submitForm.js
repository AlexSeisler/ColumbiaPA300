const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const { VITE_AIRTABLE_TOKEN, VITE_AIRTABLE_BASE_ID, VITE_AIRTABLE_TABLE_NAME } = process.env;

  if (!VITE_AIRTABLE_TOKEN || !VITE_AIRTABLE_BASE_ID || !VITE_AIRTABLE_TABLE_NAME) {
    console.error("❌ Missing Airtable credentials in environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Airtable credentials in environment variables" })
    };
  }

  const body = JSON.parse(event.body);

  console.log("📨 Received form data:", body);
  console.log("📁 File ID (from uploadDirectToDrive):", body.fileId);

  const fileUrl = body.fileId
    ? `https://drive.google.com/uc?export=download&id=${body.fileId}`
    : null;

  console.log("🔗 Constructed Drive file URL:", fileUrl);

  const airtablePayload = {
    fields: {
      Email: body.email,
      "Full Name": body.name,
      School: body.school,
      Grade: body.grade,
      Agreement: body.agreement ? true : false,
      "File Upload": fileUrl ? [{ url: fileUrl }] : []
    }
  };

  console.log("📤 Sending Airtable payload:", airtablePayload);

  try {
    const response = await fetch(`https://api.airtable.com/v0/${VITE_AIRTABLE_BASE_ID}/${VITE_AIRTABLE_TABLE_NAME}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VITE_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(airtablePayload)
    });

    const airtableData = await response.json();
    console.log("✅ AIRTABLE RESPONSE:", airtableData);

    if (!response.ok) {
      console.error("❌ Airtable rejected the request:", airtableData);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: airtableData,
          message: "Airtable rejected the request"
        })
      };
    }
    const slackMessage = {
  text: `🎨 *New Logo Submission*\n👤 ${body.name} (${body.email})\n🏫 ${body.school} – Grade ${body.grade}\n📎 <${fileUrl}|View Uploaded Logo>`
};

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackMessage),
  });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ success: true, record: airtableData })
    };
  } catch (error) {
    console.error("❌ Submission failed:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
