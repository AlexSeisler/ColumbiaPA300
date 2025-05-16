import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import SubmissionForm from '../components/SubmissionForm';
import TimelineSection from '../components/TimelineSection';
import Footer from '../components/Footer';
import HelpButton from '../components/HelpButton';
import AboutSection from '../components/AboutSection';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroBanner targetDate="2025-06-02T23:59:59" />
        <AboutSection />
        <SubmissionForm />
        <TimelineSection />
      </main>
      <Footer />
      <HelpButton />
    </>
  );
};

export default Home;
