import React from 'react';
import '../styles/shared/layout.css'; // Assuming you have a CSS file for layout styles
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};


export default Layout;
