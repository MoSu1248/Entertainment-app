import React, { useEffect, useState } from "react";
import { motion, easeInOut } from "motion/react";

export default function CardOverlay({ info, isHovered, media }) {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [cachedTrailer, setCachedTrailer] = useState({});
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!isHovered || cachedTrailer[info.id]) return;

    const fetchTrailer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${media}/${info.id}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
        );
        const data = await res.json();

        const trailer =
          data.videos?.results.find(
            (v) => v.type === "Teaser" && v.site === "YouTube",
          ) ||
          data.videos?.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube",
          ) ||
          data.videos?.results.find((v) => v.site === "YouTube");

        if (trailer) {
          const url = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0`;
          setTrailerUrl(url);
          setCachedTrailer((prev) => ({ ...prev, [info.id]: url }));
        }
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
      fetchTrailer();
    }, 800);
  }, [isHovered]);

  return (
    <>
      {isHovered && cachedTrailer[info.id] && (
        <motion.div
          className="card__context"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
        >
          <iframe
            key={cachedTrailer[info.id]}
            src={cachedTrailer[info.id]}
            title="Movie Trailer"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      )}
    </>
  );
}
