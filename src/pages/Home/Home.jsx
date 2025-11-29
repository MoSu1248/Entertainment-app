import React from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import CardGrid from "../../components/CardGrid/CardGrid";
import Trending from "../../components/Trending/Trending";
import { useSearchStore } from "../../components/Store/SearchStore";

import "./Home.scss";

export default function Home() {
  const searchTerm = useSearchStore((state)=> state.searchTerm)
  return (
    <div className="wrapper">
      <Search text={"Search for movies or TV series"} />
      {!searchTerm && <Trending />}
      <CardGrid />
    </div>
  );
}
