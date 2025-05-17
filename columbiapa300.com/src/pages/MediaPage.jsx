import React, { useState, useRef } from 'react';
import '../styles/media/media-page.css';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(null); // percentage (0–100)
  const [uploadingFileName, setUploadingFileName] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...droppedFiles]);
      e.dataTransfer.clearData();
      if (inputRef.current) {
        inputRef.current.value = null;
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
      e.target.value = null; // Reset so same file can be reselected
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

const handleSubmit = async () => {
  if (!files.length) {
    alert("⚠️ Please select a file before submitting.");
    return;
  }

  for (const file of files) {
    try {
      setUploadingFileName(file.name);
      setUploadProgress(0);

      // Step 1: Get resumable upload URL
      const initRes = await fetch('/.netlify/functions/createResumableUpload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, mimeType: file.type }),
      });

      const { uploadUrl } = await initRes.json();
      if (!uploadUrl) throw new Error("No upload URL returned");

      // Step 2: Upload via fetch using Blob (stable method)
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Content-Length': file.size.toString(), // Ensures Drive processes full stream
        },
        body: file, // Raw File or Blob object
      });

      if (res.ok) {
        setUploadProgress(null);
        alert(`✅ ${file.name} uploaded successfully!`);
      } else {
        const text = await res.text();
        console.error("❌ Upload failed response:", text);
        alert(`⚠️ ${file.name} upload failed. (${res.status})`);
        setUploadProgress(null);
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert(`⚠️ ${file.name} upload failed.`);
      setUploadProgress(null);
    }
  }
};









  return (
  <div className="upload-wrapper">
    <div className="upload-header">
      <h2>📥 Submit Your Columbia Moment</h2>
      <p>Upload a photo or short video that captures the spirit of Columbia — past or present.</p>
      <ul className="upload-instructions">
        <li>Supported: JPG, PNG, MP4, MOV</li>
        <li>Deadline: <strong>June 1, 2025</strong></li>
        <li>Files are reviewed before being published to the community wall.</li>
      </ul>
    </div>

    <form onSubmit={handleSubmit}>
      <div
        className={`upload-container ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          className="file-input-hidden"
        />
        <div className="upload-inner" onClick={handleBrowseClick}>
          <span className="upload-emoji" role="img" aria-label="upload">📤</span>
          <p>Click or drag files here to upload</p>
          <button type="button" className="upload-btn">Choose Files</button>
        </div>
      </div>

      {files.length > 0 && (
        <>
          <button type="submit" className="submit-btn">
            ✅ Submit Files
          </button>

          <div className="file-preview">
            <h4>Uploaded Files</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>

          {/* 👇 Fancy Upload Progress Bar */}
          {uploadProgress !== null && (
            <div className="progress-bar-container">
              <p>🚀 Uploading <strong>{uploadingFileName}</strong>: {uploadProgress}%</p>
              <div className="progress-bar-outer">
                <div
                  className="progress-bar-inner"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </form>

    <p className="media-fallback">
      📬 Trouble uploading? Email:{' '}
      <a href="mailto:edwinortiz@redrosedigitalmedia.com">edwinortiz@redrosedigitalmedia.com</a>
    </p>
  </div>
);

};

export default UploadSection;
