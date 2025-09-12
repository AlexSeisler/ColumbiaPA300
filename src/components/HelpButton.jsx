import React, { useState } from 'react';
import '../styles/shared/help-button.css';

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Debug log to confirm click works
  const openModal = () => {
    console.log("✅ Help button clicked");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="help-button-wrapper">
        <button
        className="help-bubble-button"
        aria-label="Need Help?"
        onClick={openModal}
      >
        <span className="help-icon">❓</span>
        <span className="help-text">💬 Need Help?</span>
      </button>
      </div>

      {isOpen && (
        <div className="help-modal-overlay" onClick={closeModal}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Need Help?</h2>
            <p>If you're having trouble submitting content or using the site, contact us:</p>
            <a
              href="mailto:admin@columbiapa300.com"
              className="help-email"
            >
              📩 admin@columbiapa300.com
            </a>
            <button className="help-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
