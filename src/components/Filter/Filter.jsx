import React, { useEffect, useState } from "react";
import "./Filter.scss";
export default function Filter({ setFilter, filter, setCards, type }) {
  function handleClick(params) {
    setFilter(params);
    setCards([]);
  }

  return (
    <select
      value={filter}
      onChange={(e) => handleClick(e.target.value)}
      className="selection"
    >
      <option value="all">All</option>
      <option value="action">Action</option>
      <option value="comedy">Comedy</option>
      <option value="drama">Drama</option>
      {type === "movie" ? (
        <option value="horror">Horror</option>
      ) : (
        <option value="mystery">Mystery</option>
      )}
      <option value="romance">Romance</option>
      <option value="sci-fi">Sci-Fi</option>
      <option value="top-rated">Top Rated</option>
      <option value="latest">Latest</option>
    </select>
  );
}
