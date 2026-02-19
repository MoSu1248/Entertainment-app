import React, { useEffect, useState } from "react";
import { useMovieModalStore } from "../Store/MovieModalStore";
import Card from "../Card/Card";
import ViewAll from "../ViewAll/ViewAll";
import Arrow from "../../assets/arrow_icon.svg?react";

export default function SimilarMovies({ movie_id }) {
  const [cardss, setCardss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarnumber, setSimilarNumber] = useState(3);
  const [cardTotal, setCardTotal] = useState();
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const { modaltype } = useMovieModalStore();

  useEffect(() => {
    const fetchMovies = async () => {
      setCardss([]);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${modaltype}/${movie_id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
        );
        const data = await res.json();

        setCardss(data.results);
        setCardTotal(data.results.length);
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
      <div className="similar__grid">
        {cardss
          ?.slice(0, similarnumber)
          .map((movie, index) =>
            !loading ? (
              <Card key={index} info={movie} media={modaltype} />
            ) : (
              <SkeletonLoader />
            ),
          )}
      </div>
      {similarnumber < cardTotal && (
        <ViewAll
          setSimilarNumber={setSimilarNumber}
          similarnumber={similarnumber}
        />
      )}
    </div>
  );
}
