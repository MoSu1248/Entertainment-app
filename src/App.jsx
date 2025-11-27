import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import CardGrid from "./components/CardGrid/CardGrid";

import Home from "./pages/Home/Home";
import Bookmarked from "./pages/Home-Bookmarked/Bookmarked";
import Movies from "./pages/Home-Movies/Movies";
import Series from "./pages/Home-Series/Series";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/movies" element={<Movies />}></Route>
          <Route path="/series" element={<Series />} />
          <Route path="/bookmarked" element={<Bookmarked />} /> */}
          <Route path="/:type" element={<CardGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
