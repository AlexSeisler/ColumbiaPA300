// Netlify Function: submit-vote.js
const fetch = require("node-fetch");
require('dotenv').config();

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const {
    AIRTABLE_TOKEN_VOTES,
    AIRTABLE_VOTES_BASE_ID,
    AIRTABLE_VOTES_TABLE
  } = process.env;

  if (!AIRTABLE_TOKEN_VOTES || !AIRTABLE_VOTES_BASE_ID || !AIRTABLE_VOTES_TABLE) {
    console.error("❌ Missing Airtable credentials in environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Airtable credentials" })
    };
  }

  const body = JSON.parse(event.body);
  const { name, email, phone, voteIds } = body;

  if (!name || !email || !phone || !Array.isArray(voteIds) || voteIds.length !== 18) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing or invalid fields" })
    };
  }

  const airtablePayload = {
    fields: {
      "Full Name": name,
      "Email": email,
      "Phone": phone,
      "Vote ID": voteIds.join(", ")
    }
  };


  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_VOTES_BASE_ID}/${AIRTABLE_VOTES_TABLE}`.trim(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN_VOTES}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(airtablePayload)
    });

    const airtableData = await response.json();

    if (!response.ok) {
      console.error("❌ Airtable rejected the request:", airtableData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: airtableData })
      };
    }

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
