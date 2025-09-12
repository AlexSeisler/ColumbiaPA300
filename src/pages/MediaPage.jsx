/**
 * Media Page — ColumbiaPA300
 * Allows users to upload community photos/videos (with drag-and-drop, previews, and progress).
 * Handles small → large uploads via Netlify functions (direct or resumable).
 */

import React, { useState, useRef } from "react";
import "../styles/media/media-page.css";

const MAX_SIZE_MB = 500;

const MediaPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadingFileName, setUploadingFileName] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.length) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
      e.dataTransfer.clearData();
      if (inputRef.current) inputRef.current.value = null;
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`❌ ${file.name} is too large. Max file size is ${MAX_SIZE_MB}MB.`);
        return false;
      }
      return true;
    });

    setFiles((prev) => [...prev, ...validFiles]);
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
      console.warn("⚠️ No files selected for upload.");
      setUploading(false);
      return;
    }

    for (const file of files) {
      try {
        setUploadingFileName(file.name);
        setUploadProgress(0);

        if (file.size > 10 * 1024 * 1024) {
          // Resumable upload
          const initRes = await fetch("/.netlify/functions/createResumableUpload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: file.name, mimeType: file.type }),
          });

          const { uploadUrl } = await initRes.json();

          await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", uploadUrl);
            xhr.setRequestHeader("Content-Type", file.type);

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                setUploadProgress(Math.round((e.loaded / e.total) * 100));
              }
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
              } else {
                reject(new Error(`Resumable failed: ${xhr.status}`));
              }
            };

            xhr.onerror = () => reject(new Error("Network error"));
            xhr.send(file);
          });
        } else {
          // Direct upload
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          const res = await fetch("/.netlify/functions/mediaUpload", {
            method: "POST",
            headers: {
              "Content-Type": file.type,
              "Content-Length": uint8Array.byteLength,
              "x-file-name": file.name,
            },
            body: uint8Array,
          });

          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Direct upload failed: ${text}`);
          }

          setUploadProgress(100);
        }
      } catch (error) {
        console.error(`❌ ${file.name} upload failed:`, error.message);
      }
    }

    // Reset state
    setUploading(false);
    setUploadProgress(null);
    setUploadingFileName("");
    setUploadComplete(true);
    setFiles([]);
    if (inputRef.current) inputRef.current.value = null;
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-header">
        <h2>📥 Submit Your Columbia Moment</h2>
        <p>
          Upload a photo or short video that captures the spirit of Columbia —
          past or present.
        </p>
        <ul className="upload-instructions">
          <li>Supported: JPG, PNG, MP4, MOV</li>
          <li>Deadline: <strong>June 1, 2025</strong></li>
          <li>Files are reviewed before being published to the community wall.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className={`upload-container ${dragActive ? "drag-active" : ""}`}
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
            <span role="img" aria-label="upload">📤</span>
            <p>Click or drag files here to upload</p>
            <button type="button" className="upload-btn">
              Choose Files
            </button>
          </div>
        </div>

        {files.length > 0 && (
          <>
            <button
              type="submit"
              className="submit-btn"
              disabled={uploading}
            >
              {uploading ? "⏳ Uploading..." : "✅ Submit Files"}
            </button>

            <div className="file-preview">
              <h4>Files Selected</h4>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>

            {uploadProgress !== null && (
              <div className="progress-bar-container">
                <p>
                  🚀 Uploading <strong>{uploadingFileName}</strong>:{" "}
                  {uploadProgress}%
                </p>
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

      {uploadComplete && (
        <p className="upload-success-message">🎉 All files uploaded successfully!</p>
      )}

      <p className="media-fallback">
        📬 Trouble uploading? Email:{" "}
        <a href="mailto:admin@columbiapa300.com">admin@columbiapa300.com</a>
      </p>
    </div>
  );
};

export default MediaPage;
