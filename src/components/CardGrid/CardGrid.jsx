import React, { useEffect, useState } from "react";
import "./CardGrid.scss";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import { useSearchStore } from "../Store/SearchStore";
import Heading from "../Heading/Heading";
import ViewAll from "../ViewAll/ViewAll";
import Filter from "../Filter/Filter";

export default function CardGrid({ results }) {
  const { type } = useParams();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const [filter, setFilter] = useState();

  const [cards, setCards] = useState([]);

  const mediaType = type || "movie";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${TMDB_API_KEY}&page=${number}&with_genres=27`,
        );
        const data = await res.json();
        setCards((prev) =>
          number === 1 ? data.results : [...prev, ...data.results],
        );
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [mediaType, number]);

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
      <div className="row">
        {type && (
          <div>
            <Heading text={headings[type] || `Results for ${searchTerm}`} />
            <Filter setFilter={setFilter} filter={filter} />
          </div>
        )}
      </div>
      <div className="card__grid">
        {searchTerm
          ? results?.map((item, index) => (
              <Card
                key={index}
                info={item}
                toggleBookmark={toggleBookmark}
                media={item.media_type}
                loading={loading}
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
                  loading={loading}
                />
              ))}
      </div>
      <ViewAll setNumber={setNumber} />
    </div>
  );
}
