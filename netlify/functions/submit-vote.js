/**
 * Netlify Function: submit-vote
 * Handles community voting submissions for ColumbiaPA300.
 * Stores vote results in Airtable with basic validation.
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
    AIRTABLE_VOTES_TOKEN,
    AIRTABLE_VOTES_BASE_ID,
    AIRTABLE_VOTES_TABLE,
  } = process.env;

  if (!AIRTABLE_VOTES_TOKEN || !AIRTABLE_VOTES_BASE_ID || !AIRTABLE_VOTES_TABLE) {
    console.error("Missing Airtable credentials in environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Server misconfiguration" }),
    };
  }

  try {
    const { name, email, phone, voteIds } = JSON.parse(event.body || "{}");

    if (!name || !email || !phone || !Array.isArray(voteIds) || voteIds.length !== 18) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing or invalid fields" }),
      };
    }

    const airtablePayload = {
      fields: {
        "Full Name": name,
        "Email": email,
        "Phone": phone,
        "Vote IDs": voteIds.join(", "),
      },
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_VOTES_BASE_ID}/${AIRTABLE_VOTES_TABLE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_VOTES_TOKEN}`,
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
        body: JSON.stringify({ success: false, message: "Vote submission failed" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ success: true, recordId: airtableData.id }),
    };
  } catch (error) {
    console.error("Vote submission error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Internal server error" }),
    };
  }
};
