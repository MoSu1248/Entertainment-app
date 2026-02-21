import React from "react";
import "./Navbar.scss";
import Nav from "./Nav";
import Logo from "../../assets/logo.svg?react";
import avatar from "../../assets/image-avatar.png";
import Logout from "../../assets/logout.svg?react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { useOverlayStore } from "../Store/useOverlayStore";

export default function Navbar() {
  const logout = useOverlayStore((state) => state.showLogout);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Logo />
        </div>
        <Nav />
        <div className="settings__wrapper">
          <button className={`nav__link`} onClick={logout}>
            <Logout />
          </button>
          <ThemeToggler />
          <div className="navbar__avatar">
            <img src={avatar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
