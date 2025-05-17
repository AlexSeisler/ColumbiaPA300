const { google } = require('googleapis');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
    }

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];

    // Parse body
    const bodyBuffer = Buffer.from(event.body, 'base64'); // Netlify encodes it as base64

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });

    const drive = google.drive({ version: 'v3', auth: await auth.getClient() });

    const uploadRes = await drive.files.create({
      requestBody: {
        name: 'upload-' + Date.now(),
        mimeType: contentType,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: contentType,
        body: bodyBuffer
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId: uploadRes.data.id })
    };

  } catch (err) {
    console.error('Upload error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
