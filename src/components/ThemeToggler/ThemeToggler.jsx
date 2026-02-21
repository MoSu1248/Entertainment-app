import React from "react";
import "./ThemeToggler.scss";
import Dark__theme from "../../assets/icon-dark-theme.svg?react";
import Light__theme from "../../assets/icon-light-theme.svg?react";
import { ThemeStore } from "../Store/ThemeStore";
import "./ThemeToggler.scss";

export default function ThemeToggler() {
  const toggleTheme = ThemeStore((state) => state.toggleTheme);
  const { theme } = ThemeStore();

  return (
    <div className="themeToggler">
      <button className="nav__link" onClick={toggleTheme}>
        {theme === "dark" ? <Light__theme /> : <Dark__theme />}
      </button>
    </div>
  );
}
