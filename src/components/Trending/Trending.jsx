import React, { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import TrendingCard from "./TrendingCard";
import Card from "../Card/Card";
import "./Trending.scss";

export default function Trending() {
  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [cards3, setCards3] = useState([]);
  const [cards4, setCards4] = useState([]);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&region=US&page=1`,
        );
        const data = await res.json();
        setCards(data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        console.log(err);
      } finally {
        console.log("loading...");
      }
    };

    fetchMovies();
  }, []);

  console.log(cards);

  return (
    <div className="trending">
      <Heading text={"Upcoming"} />
      <div className="trending__grid">
        {cards.map((item, index) => (
          <Card key={index} info={item} />
        ))}
      </div>
    </div>
  );
}
