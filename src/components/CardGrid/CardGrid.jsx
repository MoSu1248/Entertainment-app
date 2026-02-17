import React, { useEffect, useState } from "react";
import "./CardGrid.scss";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import { useSearchStore } from "../Store/SearchStore";
import Heading from "../Heading/Heading";
import ViewAll from "../ViewAll/ViewAll";
import Filter from "../Filter/Filter";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function CardGrid({ results }) {
  const { type } = useParams();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const [filter, setFilter] = useState("all");
  const [cards, setCards] = useState([]);

  const mediaType = type || "movie";

  const movieGenreMap = {
    action: 28,
    comedy: 35,
    drama: 18,
    horror: 27,
    romance: 10749,
    "sci-fi": 878,
    thriller: 53,
  };

  const tvGenreMap = {
    action: 10759,
    comedy: 35,
    drama: 18,
    mystery: 9648,
    romance: 10749,
    "sci-fi": 10765,
    thriller: 53,
  };

  const genreID =
    mediaType === "tv" ? tvGenreMap[filter] : movieGenreMap[filter];

  let currentUrl =
    filter !== "all"
      ? `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&language=en-US&page=${number}&with_genres=${genreID}`
      : `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${TMDB_API_KEY}&page=${number}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(currentUrl);
        const data = await res.json();
        setCards((prev) =>
          number === 1 ? data.results : [...prev, ...data.results],
        );
        console.log(cards);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [mediaType, number, filter]);

  useEffect(() => {
    setCards([]);
    setNumber(1);
  }, [mediaType, filter]);

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
          <div className="grid__header">
            <Heading text={headings[type] || `Results for ${searchTerm}`} />
            <Filter
              setFilter={setFilter}
              filter={filter}
              setCards={setCards}
              type={type}
            />
          </div>
        )}
      </div>
      <div className="card__grid">
        {searchTerm
          ? results?.map((item, index) =>
              !loading ? (
                <Card
                  key={index}
                  info={item}
                  toggleBookmark={toggleBookmark}
                  media={item.media_type}
                  loading={loading}
                />
              ) : (
                <SkeletonLoader />
              ),
            )
          : cards?.map((item, index) =>
              !loading ? (
                <Card
                  key={index}
                  info={item}
                  toggleBookmark={toggleBookmark}
                  media={type}
                  loading={loading}
                />
              ) : (
                <SkeletonLoader />
              ),
            )}
      </div>
      <ViewAll setNumber={setNumber} />
    </div>
  );
}
