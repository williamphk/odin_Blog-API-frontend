import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {currentYear} My Blog. All rights reserved.</p>
        <div className="footer-social">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="footer-social-link"
          >
            Github
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="footer-social-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
