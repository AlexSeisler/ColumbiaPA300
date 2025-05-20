// File: netlify/functions/driveRouter.js

/**
 * Maps MIME type or filename to a Google Drive folder ID.
 * Defaults to main folder if unknown.
 */

const folderMap = {
  images: process.env.DRIVE_FOLDER_IMAGES,       // JPG, PNG, etc.
  videos: process.env.DRIVE_FOLDER_VIDEOS,       // MP4, MOV, etc.
  docs: process.env.DRIVE_FOLDER_DOCS,           // PDF, DOCX, etc.
  logos: process.env.DRIVE_FOLDER_LOGOS,         // Special case (filenames or tag match)
  default: process.env.DRIVE_FOLDER_ID,          // Fallback
};

function getTargetFolder(contentType = '', fileName = '', uploadType = '') {
  const lowerName = fileName.toLowerCase();

  if (uploadType === 'logo' || lowerName.includes('logo')) {
    return folderMap.logos;
  }

  if (
    contentType.startsWith('image/') ||
    ['.jpg', '.jpeg', '.png', '.gif', '.heic'].some(ext => lowerName.endsWith(ext))
  ) {
    return folderMap.images;
  }

  if (
    contentType.startsWith('video/') ||
    ['.mp4', '.mov', '.webm', '.avi', '.mkv'].some(ext => lowerName.endsWith(ext))
  ) {
    return folderMap.videos;
  }

  if (
    contentType === 'application/pdf' ||
    contentType.includes('word') ||
    contentType.includes('presentation') ||
    contentType.includes('spreadsheet')
  ) {
    return folderMap.docs;
  }

  return folderMap.default;
}


module.exports = { getTargetFolder };