import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router";
import NavHome from "../../assets/icon-nav-home.svg?react";
import NavBookmark from "../../assets/icon-nav-bookmark.svg?react";
import NavMovies from "../../assets/icon-nav-movies.svg?react";
import NavSeries from "../../assets/icon-nav-tv-series.svg?react";
import Logout from "../../assets/logout.svg?react";
import { useOverlayStore } from "../Store/useOverlayStore";

export default function Nav() {
  const logout = useOverlayStore((state) => state.showLogout);
  const navLinks = [
    { type: "link", url: "/", icon: <NavHome /> },
    { type: "link", url: "/tv", icon: <NavSeries /> },
    { type: "link", url: "/movie", icon: <NavMovies /> },
    { type: "link", url: "/bookmarked", icon: <NavBookmark /> },
    // { type: "btn", action: logout, icon: <Logout /> },
  ];

  return (
    <div className="nav">
      <ul className="nav__list">
        {navLinks.map((link, index) => (
          <li className="nav__item" key={index}>
            {link.type === "link" ? (
              <NavLink
                to={link.url}
                className={`nav__link`}
                onClick={link.action}
              >
                {link.icon}
              </NavLink>
            ) : (
              <p to={link.url} className={`nav__link`} onClick={link.action}>
                {link.icon}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
