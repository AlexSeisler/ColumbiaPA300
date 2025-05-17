const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const { VITE_AIRTABLE_TOKEN, VITE_AIRTABLE_BASE_ID, VITE_AIRTABLE_TABLE_NAME } = process.env;
   // ✅ Failsafe for missing env vars
  if (!VITE_AIRTABLE_TOKEN || !VITE_AIRTABLE_BASE_ID || !VITE_AIRTABLE_TABLE_NAME) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Missing Airtable credentials in environment variables"
      })
    };
  }
  const body = JSON.parse(event.body);

  try {
    const response = await fetch(`https://api.airtable.com/v0/${VITE_AIRTABLE_BASE_ID}/${VITE_AIRTABLE_TABLE_NAME}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VITE_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          Email: body.email,
          "Full Name": body.name,
          School: body.school,
          "Grade Level": body.grade,
          Agreement: body.agreement ? "Yes" : "No",
          "Logo File Name": body.fileName || "Not uploaded"
        }
      })
    });

    const airtableData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, record: airtableData })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
