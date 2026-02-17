import React, { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import Card from "../Card/Card";
import "../Trending/Trending.scss";
import { useLocation, useNavigate } from "react-router";
import Arrow from "../../assets/arrow_icon.svg?react";
import "./Row.scss";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function Row({ endpoint, title, media, query }) {
  const [cards, setCards] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const location = useLocation();
  const navigate = useNavigate();
  const element = document.querySelector("body");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&region=US&page=1${query}`,
        );
        const data = await res.json();
        setCards(data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        console.log(err);
      } finally {
        console.log("loading...");
        setLoading(false)
      }
    };

    fetchMovies();
  }, []);

  function handleClick() {
    element.style.overflowY = "hidden";
    navigate(`/${endpoint}`, {
      state: { cards: media, background: location, genre: query },
    });
  }

  return (
    <div className="trending">
      <div className="row">
        <Heading text={title} />
        <div>
          <button className="row__btn" onClick={() => handleClick()}>
            <p>Explore All</p> <Arrow />
          </button>
        </div>
      </div>
      <div className="trending__grid">
        {cards
          ?.slice(0, 10)
          .map((item, index) =>
            !loading ? (
              <Card key={index} info={item} media={media} />
            ) : (
              <SkeletonLoader />
            ),
          )}
      </div>
    </div>
  );
}
