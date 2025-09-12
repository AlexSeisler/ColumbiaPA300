/**
 * Home Page — ColumbiaPA300
 * Civic landing page with hero, about, submission form, and timeline.
 */

import React from "react";

// Page sections
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";
import SubmissionForm from "../components/SubmissionForm";
import TimelineSection from "../components/TimelineSection";

const Home = () => {
  return (
    <main>
      <HeroBanner targetDate="2025-06-02T23:59:59" />
      <AboutSection />
      <SubmissionForm />
      <TimelineSection />
    </main>
  );
};

export default Home;
