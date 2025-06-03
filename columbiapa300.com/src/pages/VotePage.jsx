import React, { useState, useEffect } from 'react';
import '../styles/vote/vote-page.css';

const TOTAL_VOTES_ALLOWED = 18;
const BATCH_SIZE = 10;

const VoteGame = () => {
  const [logos, setLogos] = useState([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [votes, setVotes] = useState([]);
  const [positions, setPositions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const currentBatch = logos.slice(
    currentBatchIndex * BATCH_SIZE,
    (currentBatchIndex + 1) * BATCH_SIZE
  );

  useEffect(() => {
    const logoArray = [];
    for (let i = 1; i <= 178; i++) {
      logoArray.push({ id: i, src: `/logos/logo${i}.jpg` });
    }
    setLogos(logoArray);
  }, []);

  useEffect(() => {
    if (currentBatch.length === 0 && positions.length < TOTAL_VOTES_ALLOWED) {
      setCurrentBatchIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [logos, currentBatchIndex, currentBatch, positions]);

  const isValidEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const isValidPhone = (phone) => /^\+?\d{10,15}$/.test(phone.replace(/[-\s()]/g, ''));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = userInfo;
    if (!name || !isValidEmail(email) || !isValidPhone(phone)) {
      setFormError('Please enter a valid name, email, and phone number.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const handleVote = (buttonIndex, logoId) => {
    const absolutePosition = currentBatchIndex * BATCH_SIZE + buttonIndex + 1;

    const updatedPositions = [...positions, absolutePosition];
    const updatedVotes = [...votes, logoId];

    setPositions(updatedPositions);
    setVotes(updatedVotes);

    if (updatedPositions.length === TOTAL_VOTES_ALLOWED) {
      setShowThankYouPopup(true);
      setTimeout(() => {
        submitVotes(updatedPositions);
      }, 2000);
    } else {
      setCurrentBatchIndex((prev) => prev + 1);
    }
  };

  const submitVotes = async (votesToSubmit) => {
    try {
      const res = await fetch('/.netlify/functions/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voteIds: votesToSubmit,
          ...userInfo,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit votes');
      setSubmitted(true);
    } catch (err) {
      console.error('Vote submission failed:', err);
    }
  };

  if (submitted) {
    return (
      <div className="vote-complete">
        <h2>🎉 Thanks for participating!</h2>
        <p>Your votes have been submitted.</p>
      </div>
    );
  }

  if (!formSubmitted) {
    return (
      <div className="vote-game">
        <h1>Before You Vote</h1>
        <p>Please enter your info to begin voting.</p>
        <form onSubmit={handleFormSubmit} className="vote-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            required
          />
          {formError && <p className="error-message">{formError}</p>}
          <button type="submit">Start Voting</button>
        </form>
      </div>
    );
  }

  return (
    <div className="vote-game">
      {showThankYouPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Thank you!</h2>
            <p>Submitting your votes...</p>
          </div>
        </div>
      )}
      <div className="vote-progress">
        🗳️ Vote {Math.min(positions.length + 1, TOTAL_VOTES_ALLOWED)} of {TOTAL_VOTES_ALLOWED}
      </div>
      <div className="logo-grid">
        {currentBatch.map((logo, index) => (
          <div key={logo.id} className="logo-card">
            <img src={logo.src} alt={`Logo ${logo.id}`} className="logo-img" />
            <button onClick={() => handleVote(index, logo.id)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteGame;
