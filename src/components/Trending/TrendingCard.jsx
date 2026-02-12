import React, { useState } from "react";
import Catagory from "../../assets/icon-category-movie.svg?react";
import CatagoryTv from "../../assets/icon-category-tv.svg?react";
import Bookmark from "../../assets/icon-bookmark-empty.svg?react";
import BookmarkedActive from "../../assets/icon-bookmark-full.svg?react";
import "./Trending.scss";
import cardData from "../../data/data.json";
import { easeIn, easeInOut, easeOut, motion } from "motion/react";

export default function TrendingCard({ info }) {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("cards", JSON.stringify(cardData));
    return cardData;
  });
  const imageUrl = `https://image.tmdb.org/t/p/w780${info.backdrop_path}`;

  const toggleBookmark = (title) => {
    const updated = cards.map((card) => {
      if (card.title === title) {
        return { ...card, isBookmarked: !card.isBookmarked };
      }
      return card;
    });

    setCards(updated);
    localStorage.setItem("cards", JSON.stringify(updated));
  };

  return (
    <div
      className="card"
      onClick={() => handleClick(info.id)}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2, ease: easeInOut, delay: 0.1 },
        zIndex: 4,
        y: -10,
      }}
    >
      <img src={imageUrl} alt="" className="card__background" />
      <button
        className="bookmark__btn"
        onClick={() => toggleBookmark(info.title)}
      >
        {info.isBookmarked ? <BookmarkedActive /> : <Bookmark />}
      </button>
      <div className="trending__card__context">
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
