import React from "react";
import "./Search.scss";
import SearchIcon from "../../assets/icon-search.svg?react";

export default function Search({ text }) {
  return (
    <div className="search">
      <SearchIcon />
      <div className="search__wrapper">
        <input type="text" className="search__bar" placeholder={`${text}`} />
      </div>
    </div>
  );
}
