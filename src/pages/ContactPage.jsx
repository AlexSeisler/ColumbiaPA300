// src/pages/ContactPage.jsx
import React from 'react';
import '../styles/contact/contact-page.css';

const ContactPage = () => {
  return (
    <main className="contact-page">
      <section className="contact-container">
        <div className="contact-header">
          <span className="emoji" role="img" aria-label="mailbox">📬</span>
          <h1>Reach Out to the Columbia 300 Team</h1>
          <p className="contact-subtext">
            Whether you're a parent, student, local business, or community member — we’d love to hear from you.
          </p>
        </div>

        <div className="contact-methods">
          <div className="contact-card">
            <h2>✉️ Email Us</h2>
            <p>We respond within 24 hours.</p>
            <a href="mailto:admin@columbiapa300.com" className="contact-link">
              admin@columbiapa300.com
            </a>
          </div>

          <div className="contact-card">
            <h2>❓ Use the Help Button</h2>
            <p>Click the “Help” button on any page to submit a question or issue.</p>
          </div>

          <div className="contact-card">
            <h2>🙋 Volunteer or Support</h2>
            <p>Want to get involved? Reach out — we’ll match you with the right borough committee or event lead.</p>
          </div>

          <div className="contact-card">
            <h2>📣 Submit an Event</h2>
            <p>Hosting something for Columbia’s 300th? Share your event so we can include it in our celebration timeline!</p>
            <p><em>Event form launching soon.</em></p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
