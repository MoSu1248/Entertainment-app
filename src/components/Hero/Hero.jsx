import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import { useMovieModalStore } from "../Store/MovieModalStore";

import "./Hero.scss";

export default function Hero({ ref }) {
  const [banner, setBanner] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBanner = banner[currentIndex];
  const [loading, setLoading] = useState(true);
  const setModalId = useMovieModalStore((state) => state.setModalId);
  const setModalType = useMovieModalStore((state) => state.setModalType);
  const setModalStateOpen = useMovieModalStore(
    (state) => state.setModalStateOpen,
  );
  const element = document.querySelector("body");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US&region=US&page=1`,
        );
        const data = await res.json();
        setBanner(data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        console.log(err);
      } finally {
        console.log("loading...");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!banner || banner.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banner.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banner]);
  if (!currentBanner) return null;

  function handleClick(movieId, media) {
    element.style.overflowY = "hidden";

    setModalType(media);
    setModalStateOpen();
    setModalId(movieId);
  }

  return (
    <div className="hero">
      {loading || !currentBanner ? (
        <SkeletonLoader />
      ) : (
        <AnimatePresence>
          <motion.img
            key={currentBanner.title}
            src={`https://image.tmdb.org/t/p/original${currentBanner.backdrop_path}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            alt={currentBanner.title}
          />
          <div className="hero__overlay">
            <div className="hero__text">
              <h2 className="hero__text-header">{currentBanner.title}</h2>
              <p>{currentBanner.overview}</p>
              <div className="hero__btn-container">
                <button
                  onClick={() =>
                    handleClick(currentBanner.id, currentBanner.media_type)
                  }
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
