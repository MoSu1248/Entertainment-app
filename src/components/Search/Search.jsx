import React, { useState, useEffect } from "react";
import "./Search.scss";
import SearchIcon from "../../assets/icon-search.svg?react";
import { useSearchStore } from "../Store/SearchStore";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";

export default function Search() {
  const { type } = useParams();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const mediaType = type || "";
  const navigate = useNavigate();
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const setResults = useSearchStore((state) => state.setResults);

  function handleSearching(search) {
    handleSearch(search);
    navigate(`/search`);
  }

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const fetchSearchResults = async (query, page = 1) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodedQuery}&page=${page}`,
      );
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();
      return data.results;
    } catch (err) {
      console.error("Search error:", err);
      return [];
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      navigate("/");
      return;
    }

    const timeout = setTimeout(async () => {
      const searchResults = await fetchSearchResults(searchTerm);
      setResults(searchResults);
    }, 400); // wait 400ms after user stops typing

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="search">
      <SearchIcon />
      <div className="search__wrapper">
        <input
          type="text"
          className="search__bar"
          placeholder={`Search ${mediaType}`}
          value={searchTerm}
          onChange={(e) => handleSearching(e.target.value)}
        />
      </div>
    </div>
  );
}
