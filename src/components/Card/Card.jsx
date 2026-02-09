import React from "react";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import Play from "../../assets/icon-play.svg?react";
import { useMovieModalStore } from "../Store/MovieModalStore";
import "./Cards.scss";
import { useLocation, useNavigate } from "react-router";

export default function Card({ info, toggleBookmark }) {
  const imageUrl = `https://image.tmdb.org/t/p/w780${info.backdrop_path}`;
  const navigate = useNavigate();

  const location = useLocation();

  function handleClick(movieId) {
    navigate(`/${info.media_type}/${movieId}`, { state: { background: location } });
  }

  return (
    <div className="card">
      <div className="card__img">
        <img src={imageUrl} alt="" />{" "}
        <div className="overlay" onClick={() => handleClick(info.id)}>
          <button className="overlay__btn">
            <Play />
            <p className="overlay__text">View</p>
          </button>
        </div>
        <button
          className="card__bookmark-btn"
          onClick={() => toggleBookmark(info.title)}
        >
          {info.isBookmarked ? <BookmarkedActive /> : <Bookmark />}
        </button>
      </div>
      <div className="card__context">
        <ul className="card__context-list">
          <li>{info.release_date}</li>
          <li className="list__item-catagory">
            {info.media_type === "movie" ? <Catagory /> : <CatagoryTv />}
            <span>{info.media_type}</span>
          </li>
          <li>{info.vote_average + "/10"}</li>
        </ul>
        <h3 className="card__context-title">{info.title || info.name}</h3>
      </div>
    </div>
  );
}
