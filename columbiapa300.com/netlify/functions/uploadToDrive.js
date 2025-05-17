const { google } = require('googleapis');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, mimeType, base64 } = body;

    const buffer = Buffer.from(base64, 'base64');

    // ✅ Parse credentials from environment variable
    const serviceKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials: serviceKey,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.create({
      requestBody: {
        name,
        parents: [process.env.DRIVE_FOLDER_ID],
        mimeType,
      },
      media: {
        mimeType,
        body: Buffer.from(buffer),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId: res.data.id }),
    };
  } catch (err) {
    console.error('Upload error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
