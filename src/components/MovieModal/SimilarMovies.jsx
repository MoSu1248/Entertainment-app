import React, { useEffect, useState } from "react";
import { useMovieModalStore } from "../Store/MovieModalStore";
import Card from "../Card/Card";

export default function SimilarMovies({ movie_id }) {
  const [cardss, setCardss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setCardss([]);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
        );
        const data = await res.json();

        setCardss((prev) =>
          number === 1 ? data.results : [...prev, ...data.results],
        );
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchMovies, 200);

    return () => clearTimeout(timer);
  }, [movie_id]);

  return (
    <div className="similar">
      <h3>More Like This</h3>
      <div className="card__grid">
        {cardss?.map((movie, index) =>
          !loading ? (
            <Card key={index} info={movie} media={movie.media_type} />
          ) : (
            <SkeletonLoader />
          ),
        )}
      </div>
    </div>
  );
}
