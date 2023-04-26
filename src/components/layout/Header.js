import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">
        <Link to="/" className="header-link">
          My Blog
        </Link>
      </h1>
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li>
            <Link to="/" className="header-nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/new-post" className="header-nav-link">
              New Post
            </Link>
          </li>
          <li>
            <Link to="/login" className="header-nav-link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
