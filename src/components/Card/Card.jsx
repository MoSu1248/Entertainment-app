import React, { useState } from "react";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import Play from "../../assets/icon-play.svg?react";
import { useMovieModalStore } from "../Store/MovieModalStore";
import "./Cards.scss";
import { useLocation, useNavigate } from "react-router";
import { easeIn, easeInOut, easeOut, motion } from "motion/react";
import { animate } from "motion";

export default function Card({ info, toggleBookmark }) {
  const imageUrl = `https://image.tmdb.org/t/p/w780${info.backdrop_path}`;
  const navigate = useNavigate();
  const [CardHover, setCardHover] = useState(false);
  const location = useLocation();

  function handleClick(movieId) {
    navigate(`/${info.media_type}/${movieId}`, {
      state: { background: location },
    });
  }

  return (
    <motion.div
      className="card"
      onClick={() => handleClick(info.id)}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2, ease: easeInOut, delay: 0.1 },
        zIndex: 4,
        y: -10,
      }}
      onHoverStart={() => setCardHover(true)}
      onHoverEnd={() => setCardHover(false)}
    >
      <div className="card__img">
        <img src={imageUrl} alt="" />{" "}
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
            transition: { duration: 0.6, easeInOut },
          }}
          className="card__context"
        >
          <ul className="card__context-list">
            <li>{info.release_date || info.first_air_date}</li>
            <li className="list__item-catagory">
              {info.media_type === "movie" ? <Catagory /> : <CatagoryTv />}
              <span>{info.media_type}</span>
            </li>
            <li>IMDB : {info.vote_average + "/10"}</li>
          </ul>
          <h3 className="card__context-title">{info.title || info.name}</h3>
        </motion.div>
      )}
    </motion.div>
  );
}
