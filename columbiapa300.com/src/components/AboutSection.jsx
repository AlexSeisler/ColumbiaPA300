import React from 'react';
import { motion } from 'framer-motion';
import '../styles/about-section.css';
import useInViewTrigger from '../hooks/useInViewTrigger';

const AboutSection = () => {
  const [ref, isVisible] = useInViewTrigger(0.4);

  return (
    <section className="about-section" id="about">
      <motion.div
        ref={ref}
        className="about-wrapper"
        initial={{ opacity: 0, y: 80 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="civic-ribbon emoji-float">📜 300 Years in the Making</div>
        <h2 className="about-title">Why This Year Matters</h2>
        <p className="about-description">
          In 1725, a borough was born...
        </p>
        <p className="about-description highlight">
          This anniversary is more than a moment. It's a movement.
        </p>
        <blockquote className="about-quote">
          "We are all stewards of Columbia's story — past, present, and future."
        </blockquote>
      </motion.div>
    </section>
  );
};

export default AboutSection;
