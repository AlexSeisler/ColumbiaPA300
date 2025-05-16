import React from 'react';
import '../styles/help-button.css';

const HelpButton = () => {
  return (
    <div className="help-button-wrapper">
      <button className="help-orb" aria-label="Need Help?">
        <span className="help-icon">❓</span>
        <span className="chat-icon">💬</span>
        <span className="help-label">Need Help?</span>
      </button>
    </div>
  );
};

export default HelpButton;
