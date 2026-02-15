import React, { useState, useEffect } from "react";
import "./Cards.scss";
import { useNavigate, useLocation } from "react-router";
import { motion, easeInOut } from "motion/react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import { useSearchStore } from "../Store/SearchStore";
import CardOverlay from "./CardOverlay";

export default function Card({ info, toggleBookmark, media }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const searchTerm = useSearchStore((state) => state.searchTerm);

  function handleClick(movieId) {
    document.body.style.overflowY = "hidden";
    navigate(`/${media}/${movieId}`, {
      state: { background: location },
    });
  }

  const imageUrl = searchTerm
    ? `https://image.tmdb.org/t/p/original${info.poster_path}`
    : `https://image.tmdb.org/t/p/original${info.backdrop_path}`;

  return (
    <motion.div
      layoutId={String(info.id)}
      className={isHovered ? "card__hover" : "card_NotHover"}
    >
      <motion.div
        className={!searchTerm ? `card` : "card poster"}
        onClick={() => handleClick(info.id)}
        whileHover={{
          scale: 1.25,
          zIndex: 4,
          transition: { duration: 0.3, ease: easeInOut },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="card__img">
          {imageUrl ? (
            <img src={imageUrl} alt={info.title || info.name} />
          ) : (
            <div className="card__img-placeholder">No Image</div>
          )}

          {isHovered && (
            <button
              className="card__bookmark-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering card click
                toggleBookmark(info.title);
              }}
            >
              {info.isBookmarked ? <BookmarkedActive /> : <Bookmark />}
            </button>
          )}
        </div>
        <CardOverlay info={info} isHovered={isHovered} media={media} />
      </motion.div>
    </motion.div>
  );
}
