import React from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import CardGrid from "../../components/CardGrid/CardGrid";
import { useParams } from "react-router-dom";
import Trending from "../../components/Trending/Trending";
import "./Home.scss";

export default function Home() {
  const { params } = useParams();

  return (
    <div className="wrapper">
      <Search text={"Search for movies or TV series"} />
      <Trending />
      <Heading text={`Recommended for you`} />
      <CardGrid />
    </div>
  );
}
