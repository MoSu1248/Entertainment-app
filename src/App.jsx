import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLoginStore } from "./components/Store/LoginStore";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CardGrid from "./components/CardGrid/CardGrid";
import Login from "./pages/Login/Login";
import MovieModal from "./components/MovieModal/MovieModal";

import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AuthOnlyRoute from "./components/Routes/AuthRoute";
import { AnimatePresence, LayoutGroup } from "motion/react";

function App() {
  const loadUser = useLoginStore((state) => state.loadUser);
  const location = useLocation();

  // If we navigated from a page, it'll be stored here
  const backgroundLocation = location.state?.background;

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
    </LayoutGroup>
  );
}

export default App;
