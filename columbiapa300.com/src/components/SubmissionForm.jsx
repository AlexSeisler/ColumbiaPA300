import React from 'react';
import '../styles/home/submission-form.css';

const SubmissionForm = () => {
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

    <div className="form-frame drop-in paper-frame">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScb-h5ZaUZkxkdgIjg3Bt10Zo_K3AWRG_fnk1I0PnXLzxQ64Q/viewform?embedded=true"
        title="Logo Submission Form"
        allowFullScreen
        scrolling="yes"
        frameBorder="0"
      />
    </div>

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
