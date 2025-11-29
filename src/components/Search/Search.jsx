import React from "react";
import "./Search.scss";
import SearchIcon from "../../assets/icon-search.svg?react";
import { useSearchStore } from "../Store/SearchStore";

export default function Search({ text }) {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  return (
    <div className="search">
      <SearchIcon />
      <div className="search__wrapper">
        <input
          type="text"
          className="search__bar"
          placeholder={`${text}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
