import React, { useState } from 'react';
import '../styles/home/submission-form.css';

const SubmissionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadingFileName, setUploadingFileName] = useState('');


  const [formData, setFormData] = useState({
    email: '',
    name: '',
    school: '',
    grade: '',
    file: null,
    agreement: false,
  });
  const toggleForm = () => setIsOpen((prev) => !prev);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  let fileId = null;

  if (formData.file) {
    try {
      setUploadingFileName(formData.file.name);
      setUploadProgress(0);

      const arrayBuffer = await formData.file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/.netlify/functions/uploadDirectToDrive');
      xhr.setRequestHeader('Content-Type', formData.file.type);
      xhr.setRequestHeader('x-file-name', formData.file.name);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = async () => {
        try {
          const json = JSON.parse(xhr.responseText);
          if (xhr.status === 200 && json.success && json.fileId) {
            fileId = json.fileId;
            await submitToAirtable(fileId);
          } else {
            setSubmissionStatus({
              type: 'error',
              message: '⚠️ There was a problem uploading your file.',
            });
          }
        } catch (err) {
          setSubmissionStatus({
            type: 'error',
            message: '⚠️ File upload response could not be parsed.',
          });
        }
      };

      xhr.onerror = () => {
        setSubmissionStatus({
          type: 'error',
          message: '⚠️ File upload failed due to a network error.',
        });
      };

      xhr.send(uint8Array);
    } catch (err) {
      setSubmissionStatus({
        type: 'error',
        message: '⚠️ Upload failed. Try again or email admin@columbiapa300.com.',
      });
    }
  } else {
    await submitToAirtable(null); // No file uploaded
  }
};

const submitToAirtable = async (fileId) => {
  const payload = {
    email: formData.email,
    name: formData.name,
    school: formData.school,
    grade: formData.grade,
    agreement: formData.agreement,
    fileId,
  };

  const res = await fetch('/.netlify/functions/submitForm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    setShowThankYouModal(true); // ✅ Trigger thank-you
    setFormData({
      email: '',
      name: '',
      school: '',
      grade: '',
      file: null,
      agreement: false,
    });
    setUploadProgress(null);
    setUploadingFileName('');
    document.querySelector('input[type="file"]').value = null;
  } else {
    setSubmissionStatus({
      type: 'error',
      message: '⚠️ Something went wrong submitting your form. Please try again or email admin@columbiapa300.com.',
    });
  }
};





  return (
  <section className="submission-form" id="contest">
    <div className="form-container fade-in-up">
      <div className="form-badge-wrapper">
        <div className="form-badge sparkle-float pulse-ring">🎨</div>
      </div>

      <h2 className="form-title decorated-title">
        <span className="scroll-left">📜</span>
        Submit Your Logo Design
        <span className="scroll-right">📜</span>
      </h2>

      <div className="civic-badge glow-hover badge-glow">🎖️ Community Choice</div>

      <p className="instructions">
        All Columbia Borough students in grades 7-12th are invited to participate! Submit your logo to be featured in the 300th Anniversary Celebration.
      </p>

      <div className="form-tagline-banner pulse-highlight shimmer-on-scroll">
        ✍️ <strong>Columbia students are shaping history — one logo at a time.</strong>
      </div>

      {/* CTA Button */}
      <button className="submit-toggle-cta pulse-highlight" onClick={toggleForm}>
        {isOpen ? '🛑 Close Form' : '🎨 Submit Your Logo'}
      </button>

      {/* Collapsible Wrapper */}
      <div className={`collapsible-wrapper ${isOpen ? 'open' : ''}`}>
        <form className="form-frame drop-in paper-frame" onSubmit={handleSubmit}>
          <label>
            Email *
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Full Name *
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
          School Name *
          <div className="submission-radio-group" name="school">
            {['Columbia High School', 'Our Lady of the Angels', 'Home-School', 'Other'].map((school) => (
              <label key={school}>
                <input
                  type="radio"
                  name="school"
                  value={school}
                  checked={formData.school === school}
                  onChange={handleChange}
                  required
                />
                <span>{school}</span>
              </label>
            ))}
          </div>
        </label>

        <label>
          Grade Level *
          <div className="submission-radio-group" name="grade">
            {['7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade'].map((grade) => (
              <label key={grade}>
                <input
                  type="radio"
                  name="grade"
                  value={grade}
                  checked={formData.grade === grade}
                  onChange={handleChange}
                  required
                />
                <span>{grade}</span>
              </label>
            ))}
          </div>
        </label>


          <label className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}>
            <input
              type="file"
              name="file"
              accept=".png,.jpg,.jpeg,.pdf,.svg"
              required
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <span className="upload-text">
              📁 {formData.file?.name || 'Upload or drag your logo design here'}
            </span>
          </label>

          <label className="checkbox-agreement">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              required
            />
            I confirm that this design is my original work and give Columbia Borough permission to use it for public display.
          </label>

          <button
          type="submit"
          className={`submit-button pulse-highlight ${uploadProgress !== null ? 'uploading' : ''}`}
          disabled={uploadProgress !== null}
        >
          {uploadProgress !== null ? '⏳ Uploading...' : '📬 Submit Design'}
        </button>
        </form>
      </div>
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

      {/* Footer CTA */}
      <div className="form-footer-cta">
        <div className="creative-sparkle-line shimmer-pop">
          ✨ <span className="highlighted-phrase">Show us your creativity</span> — we’re excited to showcase student designs at the Borough Meeting!
        </div>
        <div className="submission-privacy-tag">
          🔐 Submissions are private and sent directly to the Columbia Borough team.
        </div>
      </div>
    </div>
    {showThankYouModal && (
  <div className="thank-you-modal-overlay">
    <div className="thank-you-modal">
      <h2>🎉 Thank You for Submitting!</h2>
      <p>Your logo has been successfully uploaded and is being reviewed by the Columbia Borough 300 team.</p>
      <p>We’re proud of your creativity and can’t wait to showcase your work!</p>
      <button onClick={() => setShowThankYouModal(false)} className="close-modal-btn">
        ✨ Close
      </button>
    </div>
  </div>
)}

  </section>
  
);

};

export default SubmissionForm;
