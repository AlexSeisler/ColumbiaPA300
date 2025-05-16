import React from 'react'
import '../styles/submission-form.css'

const SubmissionForm = () => {
  return (
    <section className="submission-form" id="contest">
      <div className="form-container">
        <div className="form-badge">
          🎨
        </div>
        <h2>Submit Your Logo Design</h2>
        <div className="civic-badge glow-hover">🎖️ Community Choice</div>
        <p className="instructions">
          All Columbia Borough students are invited to participate! Submit your logo to be featured in the 300th Anniversary Celebration.
        </p>
        <div className="form-tagline-banner">
        ✍️ Columbia students are shaping history — one logo at a time.
      </div>

        <div className="form-frame">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdExampleEmbedLink/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            title="Logo Submission Form"
            allowFullScreen={true}
            aria-label="Columbia Borough logo submission form"
          >
            Loading…
          </iframe>
        </div>
        <p className="form-cta">
      ✨ <span>Show us your creativity</span> — we’re excited to showcase student designs at the Borough Meeting!
    </p>
        <p className="security-tag">
          🔒 Submissions are private and sent directly to the Columbia Borough team.
        </p>
      </div>

      {/* ⬇️ OUTSIDE the layout container */}
      <div className="support-button">
        <a
          href="mailto:columbia300@schooldistrict.edu"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Need Help?
        </a>
      </div>
    </section>
  )
}

export default SubmissionForm
