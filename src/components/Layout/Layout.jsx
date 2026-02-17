import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import { useOverlayStore } from "../Store/useOverlayStore";
import Popup from "../Overlay/Popup";
import "./Layout.scss";
import Search from "../Search/Search";
import { useMovieModalStore } from "../Store/MovieModalStore";
import MovieModal from "../MovieModal/MovieModal";

export default function Layout() {
  const { modalId, modalState } = useMovieModalStore();

  const { overlayState } = useOverlayStore();
  return (
    <div className="layout-wrapper">
      {overlayState && <Popup />}
      <Navbar />
      <main className="content-wrapper">
        <>
          <Search />
          <Outlet />
        </>
      </main>
      {modalState && modalId && <MovieModal />}
    </div>
  );
}
