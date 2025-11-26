import React from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import cardData from "../../data/data.json";
import "./Home.scss";

export default function Home() {
  return (
    <div className="wrapper">
      <Search text={"Search for movies or TV series"} />
      <Heading text={`Recommended for you`} />
      <div className="card__grid">
        {cardData.map((item, index) => (
          <Card key={index} info={item} />
        ))}
      </div>
    </div>
  );
}
