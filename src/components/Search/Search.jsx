import React from "react";
import "./Search.scss";
import SearchIcon from "../../assets/icon-search.svg?react";
import { useSearchStore } from "../Store/SearchStore";
import { useParams } from "react-router-dom";

export default function Search() {
  const { type } = useParams();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const mediaType = type || "movie";

  return (
    <div className="search">
      <SearchIcon />
      <div className="search__wrapper">
        <input
          type="text"
          className="search__bar"
          placeholder={`Search ${mediaType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
