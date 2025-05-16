import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <img src="/logo.png" alt="Columbia Borough Logo" className="logo" />
          <h1 className="site-title">Columbia Borough 300th Anniversary</h1>
        </div>
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#contest">Contest</a></li>
            <li><a href="#timeline">Timeline</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
