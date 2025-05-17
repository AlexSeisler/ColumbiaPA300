const { google } = require('googleapis');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event) => {
  // ✅ Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'OK'
    };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: 'Method Not Allowed'
      };
    }

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    const bodyBuffer = Buffer.from(event.body, 'base64');

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });

    const drive = google.drive({ version: 'v3', auth: await auth.getClient() });

    const res = await drive.files.create({
      requestBody: {
        name: 'upload-' + Date.now(),
        mimeType: contentType,
        parents: [process.env.DRIVE_FOLDER_ID]
      },
      media: {
        mimeType: contentType,
        body: bodyBuffer
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, fileId: res.data.id })
    };

  } catch (err) {
    console.error('Upload error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
