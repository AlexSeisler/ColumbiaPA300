import React from 'react';
import '../styles/timeline-section.css';

const TimelineSection = () => {
  return (
    <section className="timeline-section" id="timeline">
      <h2 className="timeline-title">📅 Campaign Timeline</h2>
      <div className="timeline-line">
        <div className="timeline-point-card">
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-date">🖌️ May 12–18</div>
            <div className="timeline-event">Logo submissions open</div>
          </div>
        </div>

        <div className="timeline-point-card">
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-date">📸 May 19–25</div>
            <div className="timeline-event">B-roll & content collection</div>
          </div>
        </div>

        <div className="timeline-point-card">
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-date">🗳️ June 1–2</div>
            <div className="timeline-event">Voting opens to public</div>
            <div className="civic-badge glow-hover">🎖️ Community Choice</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
