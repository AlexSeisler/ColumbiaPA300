const { google } = require('googleapis');
const { Readable } = require('stream');

const serviceKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON); // ✅ Use env var

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, mimeType, base64 } = body;

    const buffer = Buffer.from(base64, 'base64');
    const stream = Readable.from(buffer); // ✅ Convert to stream

    const auth = new google.auth.GoogleAuth({
      credentials: serviceKey,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.create({
      requestBody: {
        name,
        parents: [process.env.DRIVE_FOLDER_ID],
        mimeType,
      },
      media: {
        mimeType,
        body: stream, // ✅ Use stream
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId: response.data.id }),
    };
  } catch (err) {
    console.error('Upload error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
