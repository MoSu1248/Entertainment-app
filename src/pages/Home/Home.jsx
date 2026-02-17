import React, { useState, useEffect } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import { useSearchStore } from "../../components/Store/SearchStore";
import Row from "../../components/Row/Row";
import Hero from "../../components/Hero/Hero";
import "./Home.scss";

export default function Home() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const results = useSearchStore((state) => state.results);
  const setResults = useSearchStore((state) => state.setResults);

  const rows = [
    { title: "Trending", endpoint: "trending/movie/week", media: "movie" },
    { title: "Upcoming", endpoint: "movie/upcoming", media: "movie" },
    { title: "Top Rated", endpoint: "movie/top_rated", media: "movie" },
    { title: "Popular Tv Series", endpoint: "tv/on_the_air", media: "tv" },
    { title: "Top Rated TV Series", endpoint: "tv/top_rated", media: "tv" },
    {
      title: "Horror",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=27",
    },
    {
      title: "Comedy",
      endpoint: "discover/movie",
      query: "&with_genres=35",
      media: "movie",
    },
    {
      title: "Action Movies",
      endpoint: "discover/movie",
      query: "&with_genres=28",
      media: "movie",
    },
  ];

  return (
    <div className="wrapper">
      {!searchTerm && <Hero />}
      {searchTerm && (
        <CardGrid
          results={results}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {rows?.map((row) => !searchTerm && <Row key={row.title} {...row} />)}
    </div>
  );
}
