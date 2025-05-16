import React from 'react';
import { motion } from 'framer-motion';
import '../styles/timeline-section.css';
import useInViewTrigger from '../hooks/useInViewTrigger';

const TimelineSection = () => {
  const [ref, isVisible] = useInViewTrigger(0.3);

  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -60 },
    hiddenRight: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="timeline-section" id="timeline">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="timeline-header-wrapper">
        <div className="timeline-header-inner">
          <div className="emoji-sparkle-bg">📅</div>
          <h2 className="timeline-title">Campaign Timeline</h2>
        </div>
      </div>
        <div className="timeline-line">

          {/* Card 1 – slide from left */}
          <motion.div
            className="timeline-point-card"
            initial="hiddenLeft"
            animate={isVisible ? 'visible' : 'hiddenLeft'}
            variants={cardVariants}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-date">🖌️ May 12–18</div>
              <div className="timeline-event">Logo submissions open</div>
            </div>
          </motion.div>

          {/* Card 2 – slide from right */}
          <motion.div
            className="timeline-point-card"
            initial="hiddenRight"
            animate={isVisible ? 'visible' : 'hiddenRight'}
            variants={cardVariants}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-date">📸 May 19–25</div>
              <div className="timeline-event">B-roll & content collection</div>
            </div>
          </motion.div>

          {/* Card 3 – slide from left */}
          <motion.div
            className="timeline-point-card"
            initial="hiddenLeft"
            animate={isVisible ? 'visible' : 'hiddenLeft'}
            variants={cardVariants}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-date">🗳️ June 1–2</div>
              <div className="timeline-event">Voting opens to public</div>
              <div className="civic-badge glow-hover">🎖️ Community Choice</div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSection;
