import React from "react";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import Play from "../../assets/icon-play.svg?react";
import "./Cards.scss";

export default function Card({ info, toggleBookmark }) {
  return (
    <div className="card">
      <div className="card__img">
        <img src={info.thumbnail.regular.medium} alt="" />{" "}
        <div className="overlay">
          <button className="overlay__btn">
            <Play />
            <p className="overlay__text">Play</p>
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
          <li>{info.year}</li>
          <li className="list__item-catagory">
            {info.category === "Movie" ? <Catagory /> : <CatagoryTv />}
            <span>{info.category}</span>
          </li>
          <li>{info.rating}</li>
        </ul>
        <h3 className="card__context-title">{info.title}</h3>
      </div>
    </div>
  );
}
