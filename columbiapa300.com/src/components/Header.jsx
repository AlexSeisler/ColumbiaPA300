import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 👈 State toggle
  const toggleMenu = () => setMenuOpen(!menuOpen); // 👈 Toggle handler

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <a href="https://www.columbiapa.net/" target="_blank" rel="noopener noreferrer" className="header-left">
        <img src="/logo.png" alt="Columbia Borough Logo" className="logo" />
        <h1 className="site-title">Columbia Borough 300th Anniversary</h1>
      </a>


        {/* Hamburger Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation" role="button">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vote">Vote</Link></li>
            <li><Link to="/media">Media</Link></li>
            <li><Link to="/donate" className="donate-link">Donate</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Nav */}
      <nav className={`mobile-nav ${menuOpen ? 'active' : ''}`} role="navigation">
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/vote" onClick={toggleMenu}>Vote</Link></li>
          <li><Link to="/media" onClick={toggleMenu}>Media</Link></li>
          <li><Link to="/donate" onClick={toggleMenu} className="donate-link">Donate</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
