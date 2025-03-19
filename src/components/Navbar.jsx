import React, { useState } from "react";
import "../styles/Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/">MyLogo</a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="navbar-toggle" onClick={toggleNavbar}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/electronics">Electronics</a>
          </li>
          <li>
            <a href="/fashions">Fashions</a>
          </li>
          <li>
            <a href="/mobiles">Mobiles</a>
          </li>
          <li>
            <a href="/home-appliances">Home & Appliances</a>
          </li>
          <li>
            <a href="/beauty">Beauty</a>
          </li>
          <li>
            <a href="/toys">Toys</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;