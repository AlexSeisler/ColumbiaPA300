/**
 * Root application component for ColumbiaPA300.
 * Defines site-wide layout and routing.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";

// Core layout
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HelpButton from "./components/HelpButton";

// Pages
import Home from "./pages/Home";
import VotePage from "./pages/VotePage";
import MediaPage from "./pages/MediaPage";
import ContactPage from "./pages/ContactPage";
import DonationsPage from "./pages/DonationsPage";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonationsPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <HelpButton />
    </>
  );
};

export default App;
