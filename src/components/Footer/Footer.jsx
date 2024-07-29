import React from "react";
import { Link } from "react-router-dom";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.footerSection}>
          <h4 className={css.footerHeader}>About Us</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam.
          </p>
        </div>
        <div className={css.footerSection}>
          <h4 className={css.footerHeader}>Quick Links</h4>
          <ul className={css.footerLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className={css.footerSection}>
          <h4 className={css.footerHeader}>Follow Us</h4>
          <ul className={css.footerLinks}>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
