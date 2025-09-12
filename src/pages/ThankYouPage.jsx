/**
 * Thank You Page — ColumbiaPA300
 * Displays confirmation and next steps after a successful donation.
 */

import React from "react";
import "../styles/thankyou/thank-you-page.css";

const ThankYouPage = () => {
  return (
    <main className="thank-you-page">
      <div className="thank-you-container">
        <h1>🎉 Thank You for Your Donation!</h1>
        <p>
          Your generous contribution will help make Columbia’s 300th Anniversary
          a true community celebration.
        </p>
        <p>
          We appreciate your support for our history, events, and future generations.
        </p>

        <div className="cta-buttons">
          <a href="/" className="home-button">
            Return Home
          </a>
          <a href="/media" className="media-button">
            Submit a Video Story 📹
          </a>
        </div>

        <p className="tax-note">
          📄 Need a tax receipt or have questions? Contact:{" "}
          <a href="mailto:admin@columbiapa300.com">admin@columbiapa300.com</a>
        </p>
      </div>
    </main>
  );
};

export default ThankYouPage;
