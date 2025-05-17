import React from 'react';
import '../styles/home/submission-form.css';

const SubmissionForm = () => {
  return (
    <section className="submission-form" id="contest">
      <div className="form-container fade-in-up">
        <div className="form-badge sparkle-float">🎨</div>

        <h2 className="form-title">Submit Your Logo Design</h2>

        <div className="civic-badge glow-hover">🎖️ Community Choice</div>

        <p className="instructions">
          All Columbia Borough students are invited to participate! Submit your logo to be featured in the 300th Anniversary Celebration.
        </p>

        <div className="form-tagline-banner pulse-highlight">
          ✍️ <strong>Columbia students are shaping history — one logo at a time.</strong>
        </div>

        <div className="form-frame drop-in">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScb-h5ZaUZkxkdgIjg3Bt10Zo_K3AWRG_fnk1I0PnXLzxQ64Q/viewform?embedded=true"
            title="Logo Submission Form"
            allowFullScreen
            scrolling="yes"
            frameBorder="0"
          />
        </div>

        <p className="form-cta twinkle-pop">
          ✨ <span>Show us your creativity</span> — we’re excited to showcase student designs at the Borough Meeting!
        </p>

        <p className="security-tag">
          🔒 Submissions are private and sent directly to the Columbia Borough team.
        </p>
      </div>
    </section>
  );
};

export default SubmissionForm;
