import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLoginStore } from "./components/Store/LoginStore";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CardGrid from "./components/CardGrid/CardGrid";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AuthOnlyRoute from "./components/Routes/AuthRoute";

function App() {
  const loadUser = useLoginStore((state) => state.loadUser);

  // Load the user once, when the app starts
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  );
}

export default App;
