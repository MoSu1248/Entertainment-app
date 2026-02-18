import React, { useEffect, useState } from "react";
import "./AllMoviesModal.scss";
import { useParams } from "react-router";
import CardGrid from "../CardGrid/CardGrid";
import CloseBtn from "../CloseBtn/CloseBtn";
import Card from "../Card/Card";
import { useLocation } from "react-router-dom";
import ViewAll from "../ViewAll/ViewAll";
import MovieModal from "../MovieModal/Main/MainModal";
import { useMovieModalStore } from "../Store/MovieModalStore";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function AllMoviesModal() {
  const [cardss, setCardss] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const { "*": endpoint } = useParams();
  const [number, setNumber] = useState(1);
  const location = useLocation();
  const { modalId, modalState } = useMovieModalStore();
  const [loading, setLoading] = useState(true);

  const cards = location.state?.cards;
  const genre = location.state?.genre;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&page=${number}${genre}`,
        );
        const data = await res.json();
        setCardss((prev) =>
          number === 1 ? data.results : [...prev, ...data.results],
        );
        console.log(cardss);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, number]);

  return (
    <div className="modalAll__wrapper">
      <div className="modalAll__container">
        <CloseBtn />
        <div className="card__grid">
          {cardss?.map((movie, index) =>
            !loading ? (
              <Card key={index} info={movie} media={cards} />
            ) : (
              <SkeletonLoader />
            ),
          )}
        </div>
        <ViewAll setNumber={setNumber} />
      </div>
    </div>
  );
}
