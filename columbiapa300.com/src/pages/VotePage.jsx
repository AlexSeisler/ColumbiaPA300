// src/pages/VotePage.jsx
import React from 'react';
import '../styles/vote/vote-page.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VotePage = () => {
  const submissions = [
    { id: 1, student: "Student 1", icon: "🎨" },
    { id: 2, student: "Student 2", icon: "🌟" },
    { id: 3, student: "Student 3", icon: "🕊️" },
    { id: 4, student: "Student 4", icon: "🏛️" },
  ];

  return (
    <>
      <main className="vote-page">
        <section className="vote-header">
        <div className="vote-banner">
          <span role="img" aria-label="scroll">📜</span>
          <h1 className="glow-header">Official Logo Vote</h1>
        </div>

        <p className="vote-subtext">
          Columbia is turning 300 — and our students designed its legacy.
          <br />
          Help choose the **official logo** that will represent this once-in-a-lifetime celebration.
        </p>

        <div className="vote-details">
          <p>
            🗓️ <strong>Voting opens:</strong> June 1, 2025 &nbsp;&nbsp;|&nbsp;&nbsp; 📍 <strong>Closes:</strong> June 2, 2025
          </p>
          <p>
            🧑‍⚖️ <em>One vote per person. Results revealed at the borough meeting.</em>
          </p>
        </div>
      </section>

        <section className="logo-grid">
          {submissions.map((submission, index) => (
            <div className={`logo-card card-style-${index + 1}`} key={submission.id}>
              <div className="emoji-icon" aria-hidden="true">{submission.icon}</div>
              <h2 className="logo-title">Logo Submission {submission.id}</h2>
              <h3 className="student-label">{submission.student}</h3>
              <button className="vote-btn" disabled>🗳 Vote (Opens June 1)</button>
            </div>
          ))}
        </section>

        <div className="vote-warning">
          <span role="img" aria-label="lock">🔒</span> Voting is not yet active. Please return on <strong>June 1</strong> to cast your vote!
        </div>
      </main>
    </>
  );
};

export default VotePage;
