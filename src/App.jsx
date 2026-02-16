import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLoginStore } from "./components/Store/LoginStore";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CardGrid from "./components/CardGrid/CardGrid";
import Login from "./pages/Login/Login";
import MovieModal from "./components/MovieModal/MovieModal";
import { useSearchStore } from "./components/Store/SearchStore";

import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AuthOnlyRoute from "./components/Routes/AuthRoute";
import { AnimatePresence, LayoutGroup } from "motion/react";
import AllMoviesModal from "./components/AllMoviesModal/AllMoviesModal";

function App() {
  const loadUser = useLoginStore((state) => state.loadUser);
  const location = useLocation();

  const backgroundLocation = location.state?.background;
  const cards = location.state?.cards;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <LayoutGroup>
      {/* Main routes (background) */}
      <Routes location={backgroundLocation || location}>
        <Route
          path="/login"
          element={
            <AuthOnlyRoute>
              <Login />
            </AuthOnlyRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path=":type" element={<CardGrid />} />
          <Route path="/search" element={<Home />} />
        </Route>
      </Routes>
      {/* Modal routes */}
      <AnimatePresence>
        {backgroundLocation && (
          <Routes>
            <Route path="/:type/:id" element={<MovieModal />} />
          </Routes>
        )}
      </AnimatePresence>
      {backgroundLocation && cards && (
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<AllMoviesModal />} />
        </Routes>
      )}
    </LayoutGroup>
  );
}

export default App;
