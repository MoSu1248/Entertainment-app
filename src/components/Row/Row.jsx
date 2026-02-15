import React, { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import Card from "../Card/Card";
import "../Trending/Trending.scss";
import { useLocation, useNavigate } from "react-router";
import "./Row.scss";

export default function Row({ endpoint, title, media }) {
  const [cards, setCards] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const location = useLocation();
  const navigate = useNavigate();
  const element = document.querySelector("body");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&region=US&page=1`,
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

  function handleClick() {
    element.style.overflowY = "hidden";
    console.log(endpoint);
    
    navigate(`/${endpoint}/all`, {
      state: { cards: media },
    });
  }

  return (
    <div className="trending">
      <div className="row">
        <Heading text={title} />
        <button className="row__btn" onClick={() => handleClick()}>
          Explore All
        </button>
      </div>
      <div className="trending__grid">
        {cards.slice(0, 10).map((item, index) => (
          <Card key={index} info={item} media={media} />
        ))}
      </div>
    </div>
  );
}
