import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-overlay" />
      <div className="footer-content">
        <img src="/clocktower.png" alt="Clocktower" className="footer-logo" />
        <p>© 2025 Columbia Borough 300th Anniversary</p>
        <p className="powered-by">Powered by ACS Results</p>
      </div>
    </footer>
  );
};

export default Footer;
