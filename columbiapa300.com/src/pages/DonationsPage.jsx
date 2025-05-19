import React, { useState } from "react";
import "../styles/donate/donations-page.css";

export default function DonationsPage() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Submitted:", formData);
    setShowModal(true); // Trigger Thank You modal
  };

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      amount: "",
      recurring: false,
      note: "",
      purpose: "", // ✅ Add this
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
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
}

function HeaderSection() {
  return (
    <section className="header-section">
      <h1>Help Shape Columbia’s Next 100 Years</h1>
      <p>
        As Columbia celebrates 300 years of community, culture, and resilience—
        your support ensures we leave a legacy worthy of our past.
      </p>
    </section>
  );
}

function WhySupportSection() {
  return (
    <section className="why-support-section">
      <h2>Why Support This Celebration?</h2>
      <p>
        Columbia Borough has stood strong since 1726—through every boom, battle,
        and banner raised. This 300th Anniversary is more than a party; it’s a
        moment to honor our legacy, amplify our future, and spotlight our
        community spirit.
      </p>
      <ul>
        <li>✨ Free events for all residents and families</li>
        <li>🎨 Support for local artists, students, and creators</li>
        <li>🏛 Community-driven historic exhibits & storytelling</li>
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
  <button
    type="button"
    className={formData.amount === 25 ? "selected" : ""}
    onClick={() => handleChange({ target: { name: "amount", value: 25 } })}
  >
    Supporter – $25
  </button>

  <button
    type="button"
    className={formData.amount === 100 ? "selected" : ""}
    onClick={() => handleChange({ target: { name: "amount", value: 100 } })}
  >
    Sponsor – $100
  </button>

  <button
    type="button"
    className={formData.amount === 250 ? "selected" : ""}
    onClick={() => handleChange({ target: { name: "amount", value: 250 } })}
  >
    Heritage Friend – $250
  </button>

  <button
    type="button"
    className={formData.amount === 500 ? "selected" : ""}
    onClick={() => handleChange({ target: { name: "amount", value: 500 } })}
  >
    Legacy Partner – $500
  </button>
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
          <label className={formData.purpose === 'General Borough Fund' ? 'selected' : ''}>
            <input
              type="radio"
              name="purpose"
              value="General Borough Fund"
              checked={formData.purpose === 'General Borough Fund'}
              onChange={handleChange}
              required
            />
            <span>🏛️ General Borough Fund (support operations & heritage)</span>
          </label>

          <label className={formData.purpose === 'Community Events' ? 'selected' : ''}>
            <input
              type="radio"
              name="purpose"
              value="Community Events"
              checked={formData.purpose === 'Community Events'}
              onChange={handleChange}
              required
            />
            <span>🎉 Community Events (parades, contests, and public gatherings)</span>
          </label>

          <label className={formData.purpose === 'Marketing & Outreach' ? 'selected' : ''}>
            <input
              type="radio"
              name="purpose"
              value="Marketing & Outreach"
              checked={formData.purpose === 'Marketing & Outreach'}
              onChange={handleChange}
              required
            />
            <span>📣 Marketing & Outreach (signage, ads, videos)</span>
          </label>
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
        <li>📰 Be included in local press and Borough-wide announcements</li>
        <li>🎁 Receive sponsor recognition at featured events</li>
      </ul>
      <p>
        📩 Email us to become a sponsor:
        <a href="mailto:admin@columbiapa300.com"> admin@columbiapa300.com</a>
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
          community joy to life. Together, we’re preserving the past and
          powering the next 100 years.
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
