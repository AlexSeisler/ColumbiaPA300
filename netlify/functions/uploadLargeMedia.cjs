const { google } = require('googleapis');
const { Readable } = require('stream');

exports.config = {
  bodyParser: false, // So we can stream the file
};

exports.handler = async function(event) {
  try {
    const fileName = event.headers['x-file-name'];
    const contentType = event.headers['content-type'];

    if (!fileName || !contentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing file name or content type' }),
      };
    }

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth: await auth.getClient() });

    const buffer = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body);

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

    const fileId = uploadRes.data.id;

    // Optional: Slack notification
    const slackPayload = {
      text: `📤 *Large Media Upload (Proxy)*\n📁 *${fileName}* (${contentType})\n✅ Uploaded via Netlify proxy`,
    };

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId }),
    };
  } catch (err) {
    console.error("❌ Upload proxy error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
