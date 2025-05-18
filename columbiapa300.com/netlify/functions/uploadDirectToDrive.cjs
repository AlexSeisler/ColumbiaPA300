const { google } = require('googleapis');
const { Readable } = require('stream');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.config = {
  bodyParser: false, // ✅ Ensure Netlify passes raw body as base64
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: 'CORS preflight success',
    };
  }

  console.log("📥 uploadDirectToDrive triggered");
  console.log("Incoming headers:", event.headers);
  console.log("Incoming method:", event.httpMethod);
  console.log("Raw body length:", event.body?.length);
  console.log("isBase64Encoded:", event.isBase64Encoded);

  try {
    if (!event.body) {
      throw new Error("No body received");
    }

    const contentType =
      event.headers['content-type'] || event.headers['Content-Type'] || 'application/octet-stream';

    const buffer = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body); // fallback in case Netlify passes raw

    console.log("✅ Parsed buffer, length:", buffer.length);

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth: await auth.getClient() });

    const uploadRes = await drive.files.create({
      requestBody: {
        name: event.headers['x-file-name'] || ('upload-' + Date.now()),
        mimeType: contentType,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: contentType,
        body: Readable.from(buffer), // ✅ buffer → stream
      },
    });

    console.log("✅ Upload success, file ID:", uploadRes.data.id);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true}),
    };
  } catch (err) {
    console.error("❌ Upload error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
