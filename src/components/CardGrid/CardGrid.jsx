import React, { useEffect, useState } from "react";
import "./CardGrid.scss";
import cardData from "../../data/data.json";
import Card from "../Card/Card";
import { data, useParams } from "react-router-dom";
import { useSearchStore } from "../Store/SearchStore";
import Heading from "../Heading/Heading";
import Search from "../Search/Search";

export default function CardGrid({ results, handleSearch }) {
  const { type } = useParams();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [cards, setCards] = useState([]);

  const mediaType = type || "movie";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${TMDB_API_KEY}&page=1`,
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
  }, [mediaType]);

  const toggleBookmark = (title) => {
    const updated = cards.map((card) => {
      if (card.title === title) {
        return { ...card, isBookmarked: !card.isBookmarked };
      }
      return card;
    });

    setCards(updated);
    localStorage.setItem("cards", JSON.stringify(updated));
  };

  const headings = {
    Bookmarked: "Bookmarked",
    tv: "Tv series",
    movie: "Movies",
  };

  return (
    <div className="grid">
      {/* {type && (
        <Search
          text={`Search ${headings[type]}`}
          handleSearch={() => handleSearch()}
        />
      )} */}
      <div className="row">
        <Heading text={headings[type] || `Results for ${searchTerm}`} />
      </div>
      <div className="card__grid">
        {searchTerm
          ? results.map((item, index) => (
              <Card
                key={index}
                info={item}
                toggleBookmark={toggleBookmark}
                media={item.media_type}
              />
            ))
          : cards
              ?.filter((item) => {
                if (!type) return true;
                return item.media_type === type;
              })
              ?.map((item, index) => (
                <Card
                  key={index}
                  info={item}
                  toggleBookmark={toggleBookmark}
                  media={type}
                />
              ))}
      </div>
    </div>
  );
}
