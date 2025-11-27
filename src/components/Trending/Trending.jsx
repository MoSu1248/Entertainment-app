import React from "react";
import Heading from "../Heading/Heading";
import cardData from "../../data/data.json";
import TrendingCard from "./TrendingCard";
import "./Trending.scss";

export default function Trending() {
  return (
    <div className="trending">
      <Heading text={"Trending"} />
      <div className="trending__grid">
        {cardData
          .filter((item) => item.isTrending)
          .map((item, index) => (
            <TrendingCard key={index} info={item} />
          ))}
      </div>
    </div>
  );
}
