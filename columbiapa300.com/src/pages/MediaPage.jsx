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
  for (const file of files) {
    try {
      console.log('📦 Starting upload for:', file.name);

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('📄 FileReader result:', reader.result);
          const parts = reader.result.split(',');
          if (parts.length < 2) {
            throw new Error('Invalid Base64 result format.');
          }
          resolve(parts[1]);
        };
        reader.onerror = (err) => {
          console.error('❌ FileReader error:', err);
          reject(err);
        };
        reader.readAsDataURL(file);
      });

      const res = await fetch('/.netlify/functions/uploadToDrive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: file.name,
          mimeType: file.type,
          base64,
        }),
      });

      const result = await res.json();
      console.log('✅ Upload result:', result);

      alert(`✅ ${file.name} uploaded successfully!`);
    } catch (err) {
      console.error('❌ Upload error:', err);
      alert(`⚠️ Upload failed for ${file.name}`);
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
