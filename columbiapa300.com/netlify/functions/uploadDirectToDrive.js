const { google } = require('googleapis');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const os = require('os');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = data.files.file[0]; // assumes name="file"
    const filePath = file.path;
    const fileName = file.originalFilename;
    const mimeType = file.headers['content-type'];

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
        name: fileName,
        mimeType: mimeType,
        parents: [process.env.DRIVE_FOLDER_ID]
      },
      media: {
        mimeType,
        body: fs.createReadStream(filePath)
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId: res.data.id })
    };

  } catch (err) {
    console.error('Upload error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
