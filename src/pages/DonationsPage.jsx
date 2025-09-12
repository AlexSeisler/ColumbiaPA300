/**
 * Donations Page — ColumbiaPA300
 * Allows supporters to contribute via Stripe (one-time or recurring).
 * Features donation tiers, custom amounts, and purpose selection.
 */

import React, { useState } from "react";
import "../styles/donate/donations-page.css";

const DonationsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    recurring: false,
    note: "",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.id) {
        const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Stripe error:", err.message);
      alert("Connection to Stripe failed.");
    }
  };

  return (
    <main className="donations-page">
      <HeaderSection />
      <WhySupportSection />
      <DonationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <SponsorCTA />
      {showModal && <ThankYouModal onClose={() => setShowModal(false)} />}
    </main>
  );
};

export default DonationsPage;

function HeaderSection() {
  return (
    <section className="header-section">
      <h1>Help Shape Columbia’s Next 100 Years</h1>
      <p>
        Your support ensures we leave a legacy worthy of our past as Columbia
        celebrates 300 years of community, culture, and resilience.
      </p>
    </section>
  );
}

function WhySupportSection() {
  return (
    <section className="why-support-section">
      <h2>Why Support This Celebration?</h2>
      <p>
        Columbia Borough has stood strong since 1726 — through every boom,
        battle, and banner raised. This 300th Anniversary is more than a party;
        it’s a moment to honor our legacy, amplify our future, and spotlight
        our community spirit.
      </p>
      <ul>
        <li>✨ Free events for all residents and families</li>
        <li>🎨 Support for local artists, students, and creators</li>
        <li>🏛 Historic exhibits & storytelling</li>
        <li>🤝 Local business partnerships and borough pride</li>
      </ul>
    </section>
  );
}

function DonationForm({ formData, handleChange, handleSubmit }) {
  return (
    <section className="donation-form-section">
      <h2>Choose a Donation Tier</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name *
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email *
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <div className="tier-buttons">
          {[25, 100, 250, 500].map((tier) => (
            <button
              key={tier}
              type="button"
              className={formData.amount === tier ? "selected" : ""}
              onClick={() => handleChange({ target: { name: "amount", value: tier } })}
            >
              {tier === 25 && "Supporter – $25"}
              {tier === 100 && "Sponsor – $100"}
              {tier === 250 && "Heritage Friend – $250"}
              {tier === 500 && "Legacy Partner – $500"}
            </button>
          ))}
        </div>

        <label>
          Custom Amount
          <input
            type="number"
            name="amount"
            placeholder="Enter your amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>

        <div className="recurring-checkbox">
          <input
            type="checkbox"
            id="recurring"
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
          />
          <label htmlFor="recurring">Make this a recurring monthly donation</label>
        </div>

        <label>
          Where would you like your donation to go? *
          <div className="radio-group">
            {["General Borough Fund", "Community Events", "Marketing & Outreach"].map(
              (purpose) => (
                <label
                  key={purpose}
                  className={formData.purpose === purpose ? "selected" : ""}
                >
                  <input
                    type="radio"
                    name="purpose"
                    value={purpose}
                    checked={formData.purpose === purpose}
                    onChange={handleChange}
                    required
                  />
                  <span>{purpose}</span>
                </label>
              )
            )}
          </div>
        </label>

        <label>
          Optional Message
          <textarea
            name="note"
            placeholder="Say something to the Borough team..."
            value={formData.note}
            onChange={handleChange}
          />
        </label>

        <p className="impact-message">
          💡 Your support helps fund inclusive events, local artists, and
          hometown pride.
        </p>

        <button type="submit" className="donate-button">
          💖 Donate Now
        </button>
      </form>
    </section>
  );
}

function SponsorCTA() {
  return (
    <section className="sponsor-cta-section">
      <h2>Become a Community Sponsor</h2>
      <p>
        Are you a local business or organization? Partner with the Borough’s
        300th Anniversary and:
      </p>
      <ul>
        <li>🏙 Get your logo featured on event banners and our website</li>
        <li>📰 Be included in local press and announcements</li>
        <li>🎁 Receive sponsor recognition at featured events</li>
      </ul>
      <p>
        📩 Email us to become a sponsor:{" "}
        <a href="mailto:admin@columbiapa300.com">admin@columbiapa300.com</a>
      </p>
    </section>
  );
}

function ThankYouModal({ onClose }) {
  return (
    <div className="thank-you-modal">
      <div className="modal-content">
        <h3>🎉 Thank you for supporting Columbia’s future!</h3>
        <p>
          Your contribution helps bring free events, historic exhibits, and
          community joy to life. Together, we’re preserving the past and powering
          the next 100 years.
        </p>
        <p>
          Need a tax receipt? Email us at:{" "}
          <a href="mailto:admin@columbiapa300.com">admin@columbiapa300.com</a>
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
