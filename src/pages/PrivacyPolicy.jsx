import React from 'react';
import '../styles/shared/privacy-policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <h1>Columbia PA 300 – Social Media Privacy Policy</h1>
      <p className="effective-date"><strong>Effective Date:</strong> 5/18/2025</p>

      <section>
        <h2>1. Overview</h2>
        <p>
          Columbia PA 300 is committed to respecting your privacy and protecting your personal information.
          This Privacy Policy outlines how we handle data collected through our social media platforms including
          Facebook, Instagram, and any related tools used to manage engagement and communication.
        </p>
      </section>

      <section>
        <h2>2. What Information We Collect</h2>
        <ul>
          <li>Publicly available profile information (such as your name and profile photo)</li>
          <li>Messages or comments you send directly to us or leave on posts</li>
          <li>Information submitted via forms, such as logo contest entries or survey responses</li>
          <li>Interaction data (likes, shares, saves, and views) used for general insights and engagement analysis</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>Respond to messages or inquiries</li>
          <li>Manage and promote participation in the Columbia PA 300 Logo Contest or other events</li>
          <li>Share contest entries and community-submitted content (with permission)</li>
          <li>Improve outreach and community engagement based on platform analytics</li>
          <li>Promote events and fundraising efforts related to the 300th Year Celebration</li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>
          We may link to third-party websites or services (e.g., <a href="https://ColumbiaPA300.com" target="_blank" rel="noopener noreferrer">ColumbiaPA300.com</a>, Stripe for donations).
          These services operate independently, and we encourage you to review their privacy policies before submitting
          personal information through them.
        </p>
      </section>

      <section>
        <h2>5. Content Usage and Permissions</h2>
        <p>
          By participating in contests or submitting media (e.g., logos, testimonials, photos), you grant Columbia PA 300
          permission to share this content on our official platforms for promotional purposes, unless you request otherwise in writing.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We use platform-level security features (such as Meta Business Suite and Instagram business tools)
          to help protect account access. No sensitive personal data (e.g., Social Security Numbers, payment info)
          is collected directly via social platforms.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          For questions about this policy or how your information is used, please contact:<br />
          📧 <a href="mailto:admin@ColumbiaPA300.com">admin@ColumbiaPA300.com</a><br />
          🌐 <a href="https://ColumbiaPA300.com" target="_blank" rel="noopener noreferrer">https://ColumbiaPA300.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
