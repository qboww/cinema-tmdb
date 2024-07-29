import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.navContainer}>
        <div className={css.logo}>
          <NavLink to="/" className={css.logoLink}>
            CinemaTMDB
          </NavLink>
        </div>
        <nav className={css.navLinks}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
