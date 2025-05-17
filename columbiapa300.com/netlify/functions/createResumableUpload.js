const { google } = require('googleapis');

exports.handler = async (event) => {
  try {
    const { name, mimeType } = JSON.parse(event.body);

    const serviceAccount = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf-8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const authClient = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: authClient });

    const res = await drive.files.create({
      requestBody: {
        name,
        mimeType,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
    }, {
      params: {
        uploadType: 'resumable'
      },
      headers: {
        'X-Upload-Content-Type': mimeType,
      }
    });

    const uploadUrl = res.headers.location;

    console.log("✅ Created resumable URL:", uploadUrl);
    console.log("🔎 Response headers:", res.headers);

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl }),
    };
  } catch (err) {
    console.error("❌ Netlify function error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
