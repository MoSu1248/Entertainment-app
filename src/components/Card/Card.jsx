import React from "react";
import thumbnail from "../../assets/thumbnails/112/regular/large.jpg";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import "./Cards.scss";

export default function Card({ info }) {
  return (
    <div className="card">
      <div className="card__img">
        <img src={info.thumbnail.regular.medium} alt="" />
        <button>
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
