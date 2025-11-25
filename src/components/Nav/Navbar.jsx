import React from "react";
import "./Navbar.scss";
import Nav from "./Nav";
import Logo from "../../assets/logo.svg?react";
import avatar from "../../assets/image-avatar.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Logo />
        </div>
        <Nav />
        <div className="navbar__avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  );
}
