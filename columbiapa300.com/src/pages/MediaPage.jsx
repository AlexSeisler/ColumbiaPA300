import React, { useState, useRef } from 'react';
import '../styles/media/media-page.css';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

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
  if (files.length === 0) {
    alert("❗ Please select at least one file before submitting.");
    return;
  }

  const maxSize = 50 * 1024 * 1024; // 50MB
  const oversized = files.find(file => file.size > maxSize);
  if (oversized) {
    alert(`❗ File too large: ${oversized.name}. Max size is 50MB.`);
    return;
  }

  files.forEach((file) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];

      // Netlify uses `/api/` for live endpoint rewrites
      await fetch('/api/uploadToDrive', {
        method: 'POST',
        body: JSON.stringify({
          name: file.name,
          mimeType: file.type,
          base64,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    reader.readAsDataURL(file);
  });

  alert("✅ Files submitted! Upload may take a few seconds to appear in Drive.");
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
