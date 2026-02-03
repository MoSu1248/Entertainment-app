import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import { useOverlayStore } from "../Store/useOverlayStore";
import Popup from "../Overlay/Popup";
import "./Layout.scss";

export default function Layout() {
  const { overlayState } = useOverlayStore();

  return (
    <div className="layout-wrapper">
      {overlayState && <Popup />}
      <Navbar />
      <main className="content-wrapper">
        <Outlet />
      </main>
    </div>
  );
}
