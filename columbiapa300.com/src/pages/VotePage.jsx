// VotePage.jsx (with Swipe Hint Popup)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/vote/vote-page.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

localStorage.removeItem('voted');

const VotePage = () => {
  const navigate = useNavigate();
  const isVotingOpen = true;
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(() => {
    return !localStorage.getItem('swipeHintDismissed');
  });

  useEffect(() => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const dismissHint = () => {
      setShowSwipeHint(false);
      localStorage.setItem('swipeHintDismissed', 'true');
      track.removeEventListener('scroll', dismissHint);
      track.removeEventListener('touchstart', dismissHint);
    };

    track.addEventListener('scroll', dismissHint);
    track.addEventListener('touchstart', dismissHint);

    return () => {
      track.removeEventListener('scroll', dismissHint);
      track.removeEventListener('touchstart', dismissHint);
    };
  }, []);

  const submissions = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    student: `Student ${i + 1}`,
    src: `/logos/logo${i + 1}.png`,
  }));

  const handleVoteClick = (id) => {
    setSelectedId(id);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/.netlify/functions/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, voteId: selectedId }),
      });
      if (!res.ok) throw new Error('Submission failed');
      localStorage.setItem('voted', 'true');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setSelectedId(null);
    setFormData({ name: '', email: '' });
    setError(null);
    setSubmitted(false);
  };

  return (
    <>
      <main className="vote-page">
        <section className="vote-header">
          <div className="vote-banner">
            <span role="img" aria-label="scroll">📜</span>
            <h1 className="glow-header">Official Logo Vote</h1>
          </div>
          <p className="vote-subtext">
            Columbia is turning 300 — and our students designed its legacy.<br />
            Help choose the <strong>official logo</strong> for the celebration.
          </p>
          <div className="vote-details">
            <p>🗓️ <strong>Voting Closes:</strong> June 2, 2025</p>
            <p>🧑‍⚖️ <em>One vote per person. Results revealed at the borough meeting.</em></p>
          </div>
        </section>

        <section className="carousel">
          <h2 className="carousel-header">Vote for Your Favorite Logo</h2>

          {showSwipeHint && (
            <div className="swipe-hint-popup">⬅️ Swipe for more logos</div>
          )}

          <div className="carousel-track">
            {submissions.map((logo) => (
              <div className="carousel-card" key={logo.id}>
                <img src={logo.src} alt={`Logo ${logo.id}`} className="carousel-image" />
                <h3>Logo #{logo.id}</h3>
                <button
                  className="vote-btn"
                  onClick={() => handleVoteClick(logo.id)}
                  disabled={!isVotingOpen || localStorage.getItem('voted')}
                >
                  {isVotingOpen ? '🗳 Vote' : '🗳 Vote (Opens June 1)'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {selectedId && !submitted && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close" onClick={handleClose}>✖</button>
              <h3>Vote for Logo #{selectedId}</h3>
              <form onSubmit={handleSubmit} className="vote-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <button type="submit">Submit Vote</button>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          </div>
        )}

        {submitted && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close" onClick={handleClose}>✖</button>
              <h2>🎉 Thank you for voting!</h2>
              <p>Want to shout out your pick? Submit a 10-second video here.</p>
              <button onClick={() => navigate('/media')}>Submit Video Reaction</button>
              <p>Help bring these celebrations to life.</p>
              <button onClick={() => navigate('/donate')}>Support with a Donation</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default VotePage;
