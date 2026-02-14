import React, { useState } from "react";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import "./Cards.scss";
import { useLocation, useNavigate } from "react-router";
import { easeInOut, motion } from "motion/react";
import { useSearchStore } from "../Store/SearchStore";

export default function Card({ info, toggleBookmark, media }) {
  const imageUrl = `https://image.tmdb.org/t/p/w780${info.backdrop_path} `;
  const imageUrl2 = `https://image.tmdb.org/t/p/original${info.poster_path}`;
  const navigate = useNavigate();
  const [CardHover, setCardHover] = useState(false);
  const location = useLocation();
  const element = document.querySelector("body");
  const searchTerm = useSearchStore((state) => state.searchTerm);

  function handleClick(movieId) {
    element.style.overflowY = "hidden";
    {
      !searchTerm
        ? navigate(`/${media}/${movieId}`, {
            state: { background: location },
          })
        : navigate(`/${info.media_type}/${movieId}`, {
            state: { background: location },
          });
    }
  }

  return (
    <motion.div layoutId={String(info.id)}>
      <motion.div
        className={!searchTerm ? `card` : "card poster"}
        onClick={() => handleClick(info.id)}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3, ease: easeInOut, delay: 0.1 },
          zIndex: 4,
          y: -10,
        }}
        onHoverStart={() => setCardHover(true)}
        onHoverEnd={() => setCardHover(false)}
      >
        <div className="card__img">
          {info.poster_path || info.backdrop_path ? (
            <img
              src={!searchTerm ? imageUrl : imageUrl2}
              alt={info.title}
              layoutId={`image-${info.id}`}
            />
          ) : (
            <div className="card__img-placeholder">No Image</div>
          )}
          {CardHover && (
            <button
              className="card__bookmark-btn"
              onClick={() => toggleBookmark(info.title)}
            >
              {info.isBookmarked ? <BookmarkedActive /> : <Bookmark />}
            </button>
          )}
        </div>
        {CardHover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3, easeInOut },
            }}
            className="card__context"
          >
            <ul className="card__context-list">
              <li>{info.release_date || info.first_air_date}</li>
              <li className="list__item-catagory">
                {info.media_type === "movie" ? <Catagory /> : <CatagoryTv />}
                <span>{info.media_type}</span>
              </li>
              {info.vote_average ? (
                <li>IMDB : {info.vote_average + "/10"}</li>
              ) : (
                <li>Coming Soon</li>
              )}
            </ul>
            <h3 className="card__context-title">{info.title || info.name}</h3>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
