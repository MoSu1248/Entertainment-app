import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import CardGrid from "./components/CardGrid/CardGrid";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:type" element={<CardGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
