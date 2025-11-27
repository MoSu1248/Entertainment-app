import React, { useEffect, useState } from "react";
import "./CardGrid.scss";
import cardData from "../../data/data.json";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";

export default function CardGrid() {
  const { type } = useParams();

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

  return (
    <div className="card__grid">
      {cards
        .filter((item) => {
          if (!type) return true;
          if (type === "Bookmarked") {
            return item.isBookmarked === true;
          }
          return item.category === type;
        })
        .map((item, index) => (
          <Card key={index} info={item} toggleBookmark={toggleBookmark} />
        ))}
    </div>
  );
}
