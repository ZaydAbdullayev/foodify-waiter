import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { waiterApi } from "../service/user.service";
import { tableApi } from "../service/table.service";

export const store = configureStore({
  reducer: combineReducers({
    auth: reAuth,
    [waiterApi.reducerPath]: waiterApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(waiterApi.middleware, tableApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
