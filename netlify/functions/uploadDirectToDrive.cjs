const { google } = require('googleapis');
const { Readable } = require('stream');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.config = {
  bodyParser: false,
};

exports.handler = async (event) => {
  console.log("📥 uploadDirectToDrive triggered");
  console.log("Headers:", event.headers);
  console.log("Method:", event.httpMethod);
  console.log("isBase64Encoded:", event.isBase64Encoded);
  console.log("Body length (base64):", event.body?.length);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: 'CORS preflight success',
    };
  }

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || 'application/octet-stream';
    const fileName = event.headers['x-file-name'] || 'upload-' + Date.now();

    const buffer = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body);

    console.log("✅ Buffer created, size:", buffer.length);

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
        name: fileName,
        mimeType: contentType,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: contentType,
        body: Readable.from(buffer),
      },
    });

    console.log("✅ Upload success! File ID:", uploadRes.data.id);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, fileId: uploadRes.data.id }),
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
