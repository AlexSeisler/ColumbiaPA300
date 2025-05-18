import React, { useState, useRef } from 'react';
import '../styles/media/media-page.css';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(null); // 0–100
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploading, setUploading] = useState(false); // 🆕 disables submit


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

  const MAX_SIZE_MB = 100;
  const ALLOWED_DISPLAY_TYPES = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`❌ ${file.name} is too large. Max file size is ${MAX_SIZE_MB}MB.`);
        return false;
      }
      return true; // ✅ we accept all types, only limit size
    });

    setFiles(prev => [...prev, ...validFiles]);
  };


  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setUploadComplete(false);
  setUploading(true);
  setUploadProgress(null);

  if (!files.length) {
    alert("⚠️ Please select a file before submitting.");
    setUploading(false);
    return;
  }

  for (const file of files) {
    try {
      setUploadingFileName(file.name);
      setUploadProgress(0);

      if (file.size > 10 * 1024 * 1024) {
        // 🔁 Resumable Upload for Large Files

        const initRes = await fetch('/.netlify/functions/createResumableUpload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            mimeType: file.type,
          }),
        });

        const { uploadUrl } = await initRes.json();

        await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log("✅ Resumable upload success");
            resolve(); // ✅ Success, no alert
          } else {
            console.error("❌ Resumable upload failed:", xhr.status, xhr.responseText);
            alert(`⚠️ ${file.name} upload failed. (${xhr.status})`);
            reject(new Error(xhr.responseText));
          }
        };

        xhr.onerror = () => {
        // Only show alert if the upload *actually* failed
        if (xhr.status === 0 && uploadProgress < 100) {
          console.error("❌ Network error during upload");
          alert(`⚠️ ${file.name} upload failed due to network error.`);
          reject(new Error("Network error"));
        } else {
          // ✅ It finished, even if status is unclear (local dev quirk)
          resolve();
        }
      };


        xhr.send(file);
      });



      } else {
        // 📦 Standard Upload for Small Files

        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const res = await fetch('/.netlify/functions/uploadDirectToDrive', {
          method: 'POST',
          headers: {
            'Content-Type': file.type,
            'Content-Length': uint8Array.byteLength,
            'x-file-name': file.name,
          },
          body: uint8Array,
        });

        if (res.ok) {
          const json = await res.json();
          console.log("✅ Direct upload success:", json);
          setUploadProgress(100);
        } else {
          const text = await res.text();
          console.error("❌ Direct upload failed:", text);
          alert(`⚠️ ${file.name} upload failed. (${res.status})`);
        }
      }

    } catch (error) {
      console.error("❌ Upload error:", error);
      alert(`⚠️ ${file.name} upload failed: ${error.message}`);
    }
  }

  // ✅ Cleanup UI
  setUploading(false);
  setUploadProgress(null);
  setUploadingFileName('');
  setUploadComplete(true);
  setFiles([]);

  if (inputRef.current) inputRef.current.value = null;
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
      {/* ✅ Finalized Single Submit Button */}
      <button
        type="submit"
        className="submit-btn"
        disabled={uploading || !files.length}
        style={{
          opacity: uploading || !files.length ? 0.6 : 1,
          cursor: uploading || !files.length ? 'not-allowed' : 'pointer',
        }}
      >
        {uploading ? "⏳ Uploading..." : "✅ Submit Files"}
      </button>

      {/* ✅ File Preview List */}
      <div className="file-preview">
        <h4>Uploaded Files</h4>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      {/* ✅ Upload Progress Bar */}
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

      {/* ✅ Post-Upload Success Message */}
      {uploadComplete && files.length === 0 && (
      <p className="upload-success-message">🎉 All files uploaded and cleared!</p>
    )}

    </>
  )}
</form>

      {uploadComplete && (
      <p className="upload-success-message">🎉 All files uploaded and cleared!</p>
    )}

    <p className="media-fallback">
      📬 Trouble uploading? Email:{' '}
      <a href="mailto:admin@columbiapa300.com">admin@columbiapa300.com</a>
    </p>
  </div>
);

};

export default UploadSection;
