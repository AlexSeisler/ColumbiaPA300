import React, { useState } from 'react';
import '../styles/home/submission-form.css';

const SubmissionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const fileName = formData.file?.name || '';

  const payload = {
    email: formData.email,
    name: formData.name,
    school: formData.school,
    grade: formData.grade,
    agreement: formData.agreement,
    fileName
  };

  const res = await fetch('/.netlify/functions/submitForm', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  if (result.success) {
    alert('✅ Submission successful!');

    // Clear form
    setFormData({
      email: '',
      name: '',
      school: '',
      grade: '',
      file: null,
      agreement: false
    });

    document.querySelector('input[type="file"]').value = null;
  } else {
    alert('⚠️ There was an error submitting the form.');
    console.error(result.error);
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
        All Columbia Borough students are invited to participate! Submit your logo to be featured in the 300th Anniversary Celebration.
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
            <div className="radio-group" name="school">
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
                  {school}
                </label>
              ))}
            </div>
          </label>

          <label>
            Grade Level *
            <div className="radio-group" name="grade">
              {['6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade'].map((grade) => (
                <label key={grade}>
                  <input
                    type="radio"
                    name="grade"
                    value={grade}
                    checked={formData.grade === grade}
                    onChange={handleChange}
                    required
                  />
                  {grade}
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

          <button type="submit" className="submit-button pulse-highlight">
            📬 Submit Design
          </button>
        </form>
      </div>

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
  </section>
);

};

export default SubmissionForm;
