// src/components/HelpButton.jsx
import React from 'react';
import '../styles/help-button.css';

const HelpButton = () => {
  return (
    <div className="help-button">
      <a
        href="mailto:columbia300@schooldistrict.edu"
        target="_blank"
        rel="noopener noreferrer"
        className="help-link"
        aria-label="Need help? Contact support"
      >
        🟣 Need Help?
      </a>
    </div>
  );
};

export default HelpButton;
