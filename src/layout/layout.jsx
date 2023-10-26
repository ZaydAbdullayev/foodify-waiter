import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";

export const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
