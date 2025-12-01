import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGrid from "./components/CardGrid/CardGrid";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import { useLoginStore } from "./components/Store/LoginStore";

function App() {
  const loadUser = useLoginStore((state) => state.loadUser);

  useEffect(() => {
    loadUser(); // populate user from localStorage
  }, []);

  function RedirectIfLoggedIn() {
    const user = useLoginStore((state) => state.user);
    const loadUser = useLoginStore((state) => state.loadUser);
    const navigate = useNavigate();

    useEffect(() => {
      loadUser(); // populate user from localStorage
    }, []);

    useEffect(() => {
      if (user) {
        navigate("/"); // redirect after user is loaded
      }
    }, [user]);

    return null;
  }

  return (
    <BrowserRouter>
      {" "}
      <RedirectIfLoggedIn />
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />

        {/* All pages inside your main layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:type" element={<CardGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
