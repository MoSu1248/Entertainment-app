import React, { useState, useEffect, useRef } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import { useSearchStore } from "../../components/Store/SearchStore";
import Row from "../../components/Row/Row";
import Hero from "../../components/Hero/Hero";
import { useOnInView, InView } from "react-intersection-observer";
import { useLocation } from "react-router";

import "./Home.scss";

export default function Home() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const results = useSearchStore((state) => state.results);
  const [visibleRows, setVisibleRows] = useState(3);
  const topRef = useRef();

  const trackingRef = useOnInView(
    (inView, entry, ref) => {
      if (inView) {
        if (visibleRows < rows.length) {
          setVisibleRows((prev) => prev + 3);
        }
      }
    },
    { threshold: 1 },
  );

  useEffect(() => {
    setVisibleRows(3);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 50); // 50ms delay is usually enough
  }, []);

  const rows = [
    { title: "Trending", endpoint: "trending/movie/week", media: "movie" },
    { title: "Upcoming", endpoint: "movie/upcoming", media: "movie" },
    { title: "Top Rated", endpoint: "movie/top_rated", media: "movie" },
    { title: "Popular TV Series", endpoint: "tv/on_the_air", media: "tv" },
    { title: "Top Rated TV Series", endpoint: "tv/top_rated", media: "tv" },
    {
      title: "Horror",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=27",
    },
    {
      title: "Drama",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=18",
    },
    {
      title: "Sci-Fi",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=878",
    },
    {
      title: "Thriller",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=53",
    },
    {
      title: "Comedy",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=35",
    },
    {
      title: "Action",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=28",
    },
    {
      title: "Romance",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=10749",
    },
    {
      title: "Documentaries",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=99",
    },
    {
      title: "Family",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=10751",
    },
    {
      title: "Animation",
      endpoint: "discover/movie",
      media: "movie",
      query: "&with_genres=16",
    },
  ];

  return (
    <div className="wrapper">
      {!searchTerm && <Hero ref={topRef} />}
      {searchTerm && (
        <CardGrid
          results={results}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {!searchTerm &&
        rows
          .slice(0, visibleRows)
          .map((row) => <Row key={row.title} {...row} />)}
      <div ref={trackingRef}></div>
    </div>
  );
}
