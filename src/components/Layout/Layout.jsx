import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import "./Layout.scss";

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="content-wrapper">
        <Outlet />
      </main>
    </div>
  );
}
