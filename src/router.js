import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/global.css";
import "./assets/root.css";
import { Home } from "./pages/home/home";
import { Auth } from "./auth/auth";
import { Login } from "./auth/login";
import { Layout } from "./layout/layout";
import { Products, ProductsList } from "./pages/products/products";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Home />} />
          <Route path="category/:type/:number" element={<Products />} />
          <Route path="order/:number/:category" element={<ProductsList />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export const About = () => <h1>About</h1>;
export const Dashboard = () => <h1>Dashboard</h1>;
