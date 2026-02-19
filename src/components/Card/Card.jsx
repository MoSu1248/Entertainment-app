import React, { useState, useEffect } from "react";
import "./Cards.scss";
import { useNavigate, useLocation } from "react-router";
import { motion, easeInOut } from "motion/react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import { useSearchStore } from "../Store/SearchStore";
import CardOverlay from "./CardOverlay";
import { useMovieModalStore } from "../Store/MovieModalStore";

export default function Card({ info, media }) {
  const [isHovered, setIsHovered] = useState(false);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setModalId = useMovieModalStore((state) => state.setModalId);
  const setModalType = useMovieModalStore((state) => state.setModalType);
  const { modalState } = useMovieModalStore();
  const element = document.querySelector("body");

  const setModalStateOpen = useMovieModalStore(
    (state) => state.setModalStateOpen,
  );

  function handleClick(movieId) {
    element.style.overflowY = "hidden";
    setModalType(media);
    setModalStateOpen();
    setModalId(movieId);
  }

  const imageUrl =
    info.media_type === "person"
      ? info.profile_path
        ? `https://image.tmdb.org/t/p/w342${info.profile_path}`
        : null
      : info.backdrop_path || info.poster_path
        ? `https://image.tmdb.org/t/p/w780${info.backdrop_path || info.poster_path}`
        : null;

  const hasImage =
    info.media_type === "person"
      ? !!info.profile_path
      : !!(info.backdrop_path || info.poster_path);

  return (
    <motion.div
      layoutId={modalState ? "" : String(info.id)}
      className={isHovered ? "card__hover" : "card_NotHover"}
    >
      <motion.div
        className={!searchTerm ? `card` : "card poster"}
        onClick={() => handleClick(info.id)}
        whileHover={{
          scale: 1.2,
          zIndex: 4,
          transition: { duration: 0.3, ease: easeInOut },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="card__img">
          {hasImage && imageUrl ? (
            <img src={imageUrl} alt={info.title || info.name} />
          ) : (
            <div className="card__img-placeholder">No Image</div>
          )}
          {/* {isHovered && (
            <button
              className="card__bookmark-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering card click
                toggleBookmark(info.title);
              }}
            >
              {info.isBookmarked ? <BookmarkedActive /> : <Bookmark />}
            </button>
          )} */}
        </div>
        <CardOverlay info={info} isHovered={isHovered} media={media} />
      </motion.div>
    </motion.div>
  );
}
