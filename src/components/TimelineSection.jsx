import React from 'react';
import '../styles/home/timeline-section.css';

const timelineData = [
  {
    id: 1,
    icon: '🖌️',
    date: 'May 12',
    text: 'Logo submissions open',
  },
  {
    id: 2,
    icon: '📸',
    date: 'May 19–25',
    text: 'B-roll & content collection',
  },
  {
    id: 3,
    icon: '🗳️',
    date: 'June 1–2',
    text: 'Voting opens to public',
    badge: '🎖️ Community Choice',
  },
];

const TimelineSection = () => {
  return (
    <section className="timeline-section zigzag-layout" id="timeline">
      {/* Header */}
      <div className="timeline-header-wrapper">
        <div className="timeline-header-inner">
          <div className="emoji-sparkle-bg">📅</div>
          <h2 className="timeline-title">Campaign Timeline</h2>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="zigzag-timeline">
        {timelineData.map((item, idx) => (
          <div key={item.id} className={`zigzag-row ${idx % 2 === 0 ? 'left' : 'right'}`}>
            <div className="zigzag-content">
              <div className="zigzag-pin">📍</div>
              <div className="zigzag-card">
                <div className="timeline-date">{item.icon} {item.date}</div>
                <div className="timeline-event">{item.text}</div>
                {item.badge && (
                  <div className="civic-badge glow-hover">{item.badge}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
