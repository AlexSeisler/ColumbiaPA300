/**
 * Privacy Policy Page — ColumbiaPA300
 * Outlines how ColumbiaPA300 handles user data across social media and platform engagement.
 */

import React from "react";
import "../styles/shared/privacy-policy.css";

const PrivacyPolicy = () => {
  return (
    <main className="privacy-policy-page">
      <h1>Columbia PA 300 – Social Media Privacy Policy</h1>
      <p className="effective-date">
        <strong>Effective Date:</strong> May 18, 2025
      </p>

      <section>
        <h2>1. Overview</h2>
        <p>
          Columbia PA 300 is committed to respecting your privacy and protecting
          your personal information. This Privacy Policy outlines how we handle
          data collected through our social media platforms including Facebook,
          Instagram, and any related tools used to manage engagement and
          communication.
        </p>
      </section>

      <section>
        <h2>2. What Information We Collect</h2>
        <ul>
          <li>Publicly available profile information (such as name, photo)</li>
          <li>Messages or comments sent directly to us or left on posts</li>
          <li>Information submitted via forms (logo entries, surveys, etc.)</li>
          <li>
            Interaction data (likes, shares, saves, views) for insights and
            engagement analysis
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>Respond to messages or inquiries</li>
          <li>
            Manage and promote participation in the Logo Contest or other events
          </li>
          <li>
            Share contest entries and community content (with permission)
          </li>
          <li>
            Improve outreach and engagement based on platform analytics
          </li>
          <li>
            Promote events and fundraising efforts for the 300th Year Celebration
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>
          We may link to third-party services (e.g.,{" "}
          <a
            href="https://columbiapa300.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            ColumbiaPA300 Website
          </a>
          , Stripe for donations). These operate independently — review their
          privacy policies before submitting personal information.
        </p>
      </section>

      <section>
        <h2>5. Content Usage and Permissions</h2>
        <p>
          By participating in contests or submitting media (logos, photos,
          testimonials), you grant Columbia PA 300 permission to share this
          content on our official platforms for promotional purposes, unless you
          request otherwise in writing.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We use platform-level security features (Meta Business Suite,
          Instagram business tools) to protect account access. No sensitive
          personal data (like SSNs or payment info) is collected directly via
          social platforms.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          For questions about this policy or how your information is used,
          contact us at:
          <br />
          📧{" "}
          <a href="mailto:admin@columbiapa300.com">
            admin@columbiapa300.com
          </a>
          <br />
          🌐{" "}
          <a
            href="https://columbiapa300.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            ColumbiaPA300 Website
          </a>
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
