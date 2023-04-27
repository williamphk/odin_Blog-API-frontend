import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { currentUser } = useAuth();
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();

    logout();
  };

  return (
    <header className="header">
      <h1 className="header-title">
        <Link to="/odin_Blog-API-frontend/" className="header-link">
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
          {currentUser && (
            <li>
              <Link to="/new-post" className="header-nav-link">
                New Post
              </Link>
            </li>
          )}
          <li>
            {currentUser ? (
              <Link onClick={handleLogout} className="header-nav-link">
                Logout
              </Link>
            ) : (
              <Link to="/login" className="header-nav-link">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
