// src/Header.js
import React from 'react';
import './header.scss'; // Import the SCSS file

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/Jaspersoft_logo.png" alt="Logo of jaspersoft" />
      </div>
    </header>
  );
}

export default Header;
