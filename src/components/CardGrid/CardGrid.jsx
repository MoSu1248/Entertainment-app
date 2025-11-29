import React, { useEffect, useState } from "react";
import "./CardGrid.scss";
import cardData from "../../data/data.json";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import { useSearchStore } from "../Store/SearchStore";
import Heading from "../Heading/Heading";
import Search from "../Search/Search";

export default function CardGrid() {
  const { type } = useParams();
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("cards", JSON.stringify(cardData));
    return cardData;
  });

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

  const headings = {
    Bookmarked: "Bookmarked",
    "TV Series": "TV Series",
    Movie: "Movies",
  };

  return (
    <div className="grid">
      {type && <Search text={`Search ${headings[type]}`} />}
      <Heading text={headings[type] || "Recommended for you"} />
      <div className="card__grid">
        {cards
          .filter((item) => {
            if (!type) return true;
            if (type === "Bookmarked") {
              return item.isBookmarked === true;
            }
            return item.category === type;
          })
          .filter((item) => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((item, index) => (
            <Card key={index} info={item} toggleBookmark={toggleBookmark} />
          ))}
      </div>
    </div>
  );
}
