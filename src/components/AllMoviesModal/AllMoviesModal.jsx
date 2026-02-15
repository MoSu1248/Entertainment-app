import React, { useEffect, useState } from "react";
import "./AllMoviesModal.scss";
import { useParams } from "react-router";
import CardGrid from "../CardGrid/CardGrid";
import CloseBtn from "../CloseBtn/CloseBtn";
import { motion } from "motion/react";

export default function AllMoviesModal() {
  const [cardss, setCardss] = useState([]);
  const { media, type, time } = useParams();
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const text = `${type.toLowerCase()}/${media.toLowerCase()}/${time.toLowerCase()}`;
  console.log(type);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${media}/${time}?api_key=${TMDB_API_KEY}&page=1`,
        );
        const data = await res.json();
        setCardss(data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        console.log(err);
      } finally {
        console.log("loading...");
      }
    };

    fetchMovies();
  }, [media]);

  console.log(cardss);

  return (
    <div className="modalAll__wrapper">
      <motion.div className="modalAll__container">
        <CloseBtn />
        <CardGrid results={cardss} />
      </motion.div>
    </div>
  );
}
