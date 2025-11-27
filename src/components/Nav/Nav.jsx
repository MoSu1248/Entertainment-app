import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router";
import NavHome from "../../assets/icon-nav-home.svg?react";
import NavBookmark from "../../assets/icon-nav-bookmark.svg?react";
import NavMovies from "../../assets/icon-nav-movies.svg?react";
import NavSeries from "../../assets/icon-nav-tv-series.svg?react";

export default function Nav() {
  const navLinks = [
    { url: "/", icon: <NavHome /> },
    { url: "/TV Series", icon: <NavSeries /> },
    { url: "/Movie", icon: <NavMovies /> },
    { url: "/Bookmarked", icon: <NavBookmark /> },
  ];

  return (
    <div className="nav">
      <ul className="nav__list">
        {navLinks.map((link, index) => (
          <li className="nav__item" key={index}>
            <NavLink to={link.url} className={`nav__link`}>
              {link.icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
