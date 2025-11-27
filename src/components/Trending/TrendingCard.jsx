import React from "react";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import "./TrendingCard.scss"

export default function TrendingCard({ info }) {
  return (
    <div className="card">
        <img src={info.thumbnail.trending.large} alt="" className="card__background"/>
        <button>
          {info.isBookmarked ? <BookmarkedActive /> : <Bookmark />}
        </button>
      <div className="trneding__card__context">
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
