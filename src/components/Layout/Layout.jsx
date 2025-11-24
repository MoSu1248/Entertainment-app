import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <main className="content-wrapper">
        <Outlet />
      </main>
    </div>
  );
}
