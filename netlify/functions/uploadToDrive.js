/**
 * Netlify Function: uploadToDrive
 * Handles base64-encoded file uploads to Google Drive.
 * Suitable for smaller files directly posted from client.
 */

const { google } = require("googleapis");
const { Readable } = require("stream");

exports.handler = async (event) => {
  try {
    const { name, mimeType, base64 } = JSON.parse(event.body || "{}");

    if (!name || !mimeType || !base64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing required fields" }),
      };
    }

    const buffer = Buffer.from(base64, "base64");

    const creds = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, "base64").toString("utf8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth: await auth.getClient() });

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
        body: bufferStream,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, fileId: res.data.id }),
    };
  } catch (err) {
    console.error("UploadToDrive error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Upload failed" }),
    };
  }
};
