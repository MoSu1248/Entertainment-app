import React, { useEffect, useState } from "react";
import { motion, easeInOut, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

import "./Hero.scss";

export default function Hero() {
  const [banner, setBanner] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBanner = banner[currentIndex];
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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

  function handleClick(movieId) {
    document.body.style.overflowY = "hidden";
    navigate(`/movie/${movieId}`, {
      state: { background: location },
    });
  }

  return (
    <div className="hero">
      {loading ? (
        <SkeletonLoader />
      ) : (
        <AnimatePresence>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key={currentBanner.title}
            mode="wait"
            src={`https://image.tmdb.org/t/p/original${currentBanner.backdrop_path}`}
            alt=""
          />
          <div className="hero__overlay">
            <div className="hero__text">
              <h2 className="hero__text-header">{currentBanner.title}</h2>
              <p>{currentBanner.overview}</p>
              <div className="hero__btn-container">
                <button
                  className="more"
                  onClick={() => handleClick(currentBanner.id)}
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
