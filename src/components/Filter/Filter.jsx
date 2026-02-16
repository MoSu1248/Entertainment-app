import React, { useState } from "react";
import "./Filter.scss";
export default function Filter({ setFilter, filter }) {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="action">Action</option>
      <option value="comedy">Comedy</option>
      <option value="drama">Drama</option>
      <option value="horror">Horror</option>
      <option value="romance">Romance</option>
      <option value="sci-fi">Sci-Fi</option>
      <option value="top-rated">Top Rated</option>
      <option value="latest">Latest</option>
    </select>
  );
}
