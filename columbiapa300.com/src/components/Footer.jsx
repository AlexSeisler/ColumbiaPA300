import React from 'react';
import '../styles/home/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bg" />
      <div className="footer-container">
        <img src="/clocktower.png" alt="Clocktower" className="footer-logo glow" />
        <div className="footer-text">
          <p>© 2025 Columbia Borough 300th Anniversary</p>
          <p className="powered-tag">
            🛠️ Powered by <a href="https://redrosedigitalmedia.com/">Red Rose Digital Media</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
