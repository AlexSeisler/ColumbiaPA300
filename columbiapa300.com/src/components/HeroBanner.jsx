import React from 'react';
import '../styles/home/hero-banner.css';
import CountdownTimer from './CountdownTimer';

const HeroBanner = () => {
  return (
    <section className="hero-banner" id="hero">
      <div className="hero-bg-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Celebrate 300 Years of Columbia</h1>
        <p className="hero-subtitle">
          Join us for a borough-wide celebration of history, creativity, and community pride.
        </p>
        <div className="hero-countdown-box">
          <CountdownTimer targetDate="2025-06-02T23:59:59" />
        </div>
        <a href="#contest" className="hero-cta">🎨 Submit a Logo</a>
        <div className="scroll-down-cue">⌄</div>
      </div>
    </section>
  );
};

export default HeroBanner;
