import React, { useState, useRef } from 'react';
import '../styles/media/media-page.css';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  // Drag handlers
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
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = () => {
    alert('This is where your upload handler would go (e.g., Google Drive, API)');
    console.log('Submitting files:', files);
  };

  return (
    <div className="upload-wrapper">
      {/* Header */}
      <div className="upload-header">
        <h2>📥 Submit Your Columbia Moment</h2>
        <p>Upload a photo or short video that captures the spirit of Columbia — past or present.</p>
        <ul className="upload-instructions">
          <li>Supported: JPG, PNG, MP4, MOV</li>
          <li>Deadline: <strong>June 1, 2025</strong></li>
          <li>Files are reviewed before being published to the community wall.</li>
        </ul>
      </div>

      {/* Upload Zone */}
      <div
        className={`upload-container ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          className="file-input-hidden"
        />
        <div className="upload-inner">
          <span className="upload-emoji" role="img" aria-label="upload">📤</span>
          <p>Click or drag files here to upload</p>
          <button type="button" className="upload-btn" onClick={handleBrowseClick}>Choose Files</button>
        </div>
      </div>

      {/* Submit + File Preview */}
      {files.length > 0 && (
        <>
          <button className="submit-btn" onClick={handleSubmit}>
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

      {/* Fallback Note */}
      <p className="media-fallback">
        📬 Trouble uploading? Email:{' '}
        <a href="mailto:edwinortiz@redrosedigitalmedia.com">edwinortiz@redrosedigitalmedia.com</a>
      </p>
    </div>
  );
};

export default UploadSection;
