const { google } = require('googleapis');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, mimeType, base64 } = body;

    const buffer = Buffer.from(base64, 'base64');

    // ✅ DECODE base64 env var into JSON object
    const keyJson = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf-8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: keyJson,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const { Readable } = require('stream');

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    const res = await drive.files.create({
      requestBody: {
        name,
        parents: [process.env.DRIVE_FOLDER_ID],
        mimeType,
      },
      media: {
        mimeType,
        body: bufferStream, // ✅ now it's a stream!
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
