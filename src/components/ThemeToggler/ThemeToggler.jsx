import React from "react";
import "./ThemeToggler.scss";
import Dark__theme from "../../assets/icon-dark-theme.svg?react";
import Light__theme from "../../assets/icon-light-theme.svg?react";
// import { useThemeStore } from "../stores/useThemeStore";
import "./ThemeToggler.scss";

export default function ThemeToggler() {
  //   const toggleTheme = useThemeStore((state) => state.toggleTheme);
  //   const theme = useThemeStore((state) => state.theme);

  return (
    <div className="themeToggler">
      <button className="themeToggler__container">
        <Light__theme />
        <Dark__theme />
      </button>
    </div>
  );
}
