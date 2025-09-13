import React, { useState } from 'react';
import './Navbar.css';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function Navbar({ sticky, transparent }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Home click handler (logout from dashboard)
  const handleHomeClick = (e) => {
    if (location.pathname.startsWith("/dashboard")) {
      e.preventDefault();
      const confirmLogout = window.confirm("Going to Home will log you out. Continue?");
      if (confirmLogout) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    }
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div
      className={`navbar 
        ${sticky ? "sticky-navbar" : ""} 
        ${transparent ? "transparent-navbar" : ""}`}
    >
      {/* Logo */}
      <div className="rightSide">
        <h1 className="logo">
          <RouterLink to="/" onClick={handleHomeClick}>DevWrite</RouterLink>
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="leftSide">
        <ul className="navLinks">
          <li className="nav-link">
            <RouterLink to="/" onClick={handleHomeClick}>Home</RouterLink>
          </li>
          <li className="nav-link">
            <ScrollLink to="all-articles" smooth={true} duration={1500} offset={50}>
              Explore
            </ScrollLink>
          </li>
          <li className="nav-link">
            <RouterLink to="/login">Login</RouterLink>
          </li>
        </ul>

        <button className="button-primary">
          <RouterLink className="button-link" to="/create-article">
            Start Writing
          </RouterLink>
        </button>
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Overlay (same links, style changes by class) */}
      <div
        className={`mobileMenu ${isOpen ? "open" : ""} ${isDashboard ? "dashboard-overlay" : "home-overlay"
          }`}
      >
        <button className="close-btn" onClick={closeMenu}>×</button>
        <ul>
          <li>
            <RouterLink to="/" onClick={(e) => { handleHomeClick(e); closeMenu(); }}>Home</RouterLink>
          </li>
          <li>
            <ScrollLink to="all-articles" smooth={true} duration={1500} offset={50} onClick={closeMenu}>
              Explore
            </ScrollLink>
          </li>
          <li><RouterLink to="/login" onClick={closeMenu}>Login</RouterLink></li>
          <li>
            <RouterLink to="/create-article" className="mobile-button" onClick={closeMenu}>
              Start Writing
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
