/**
 * Not Found Page — ColumbiaPA300
 * Catch-all for undefined routes (404 handler).
 */

import React from "react";
import { Link } from "react-router-dom";
import "../styles/shared/not-found-page.css";

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <section>
        <h1>🚧 404 – Page Not Found</h1>
        <p>
          This page doesn’t exist. It may have moved, just like Columbia has
          grown through the years.
        </p>
        <Link to="/" className="cta">
          Return Home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
