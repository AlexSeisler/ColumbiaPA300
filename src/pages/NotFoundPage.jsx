// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared/not-found-page.css';
const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <section>
        <h1>🚧 404 – Page Not Found</h1>
        <p>This page doesn’t exist. Maybe it moved with the times — just like Columbia.</p>
        <Link to="/" className="cta">Return Home</Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
