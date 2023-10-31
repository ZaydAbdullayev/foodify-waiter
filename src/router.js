import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/global.css";
import "./assets/root.css";
import { Home } from "./pages/home/home";
import { Auth } from "./auth/auth";
import { CheackDepartment, Login } from "./auth/login";
import { Layout } from "./layout/layout";
import { Products } from "./pages/products/products";
import { OrderById } from "./pages/orders/orders";
import { PaymentCheck } from "./components/payment-check/check";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/check" element={<CheackDepartment />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Home />} />
          <Route path="category/:type/:number" element={<Products />} />
          <Route path="/:type/:number" element={<OrderById />} />
          <Route path="payment/check" element={<PaymentCheck />} />
        </Route>
      </Route>
    </Routes>
  );
};

