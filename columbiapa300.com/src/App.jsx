// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import Header from './components/Header';
import Footer from './components/Footer';
import HelpButton from './components/HelpButton';

import Home from './pages/Home';
import VotePage from './pages/VotePage';
import MediaPage from './pages/MediaPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
      <HelpButton />
    </>
  );
};

export default App;
