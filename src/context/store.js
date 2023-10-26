import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { waiterApi } from "../service/user.service";

export const store = configureStore({
  reducer: combineReducers({
    auth: reAuth,
    [waiterApi.reducerPath]: waiterApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(waiterApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
