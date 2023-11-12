import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Router } from "./router";
import { store } from "./context/store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Router />
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>
);
