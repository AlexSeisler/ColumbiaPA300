import React from 'react';
import '../styles/home/submission-form.css';

const SubmissionForm = () => {
  return (
    <section className="submission-form" id="contest">
      <div className="form-container fade-in-up">
        <div className="form-badge sparkle-float">
          🎨
        </div>

        <h2 className="form-title">Submit Your Logo Design</h2>

        <div className="civic-badge glow-hover">🎖️ Community Choice</div>

        <p className="instructions">
          All Columbia Borough students are invited to participate! Submit your logo to be featured in the 300th Anniversary Celebration.
        </p>

        <div className="form-tagline-banner pulse-highlight">
          ✍️ <strong>Columbia students are shaping history — one logo at a time.</strong>
        </div>

        <div
        className="form-frame drop-in"
        style={{
          overflow: 'hidden',
          borderRadius: '12px',
          pointerEvents: 'auto',
          maxWidth: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: window.innerWidth <= 768 ? 'block' : 'none',
          }}
        ></div>

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScb-h5ZaUZkxkdgIjg3Bt10Zo_K3AWRG_fnk1I0PnXLzxQ64Q/viewform?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          title="Logo Submission Form"
          allowFullScreen
          aria-label="Columbia Borough logo submission form"
          scrolling="no"
          tabIndex="-1"
          style={{
            maxHeight: '60vh',
            overflowAnchor: 'none',
            borderRadius: '12px',
          }}
        >
          Loading…
        </iframe>
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
