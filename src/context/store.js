import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { waiterApi } from "../service/user.service";
import { tableApi } from "../service/table.service";
import { orderApi } from "../service/order.service";

export const store = configureStore({
  reducer: combineReducers({
    auth: reAuth,
    [waiterApi.reducerPath]: waiterApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      waiterApi.middleware,
      tableApi.middleware,
      orderApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
