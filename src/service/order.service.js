import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
// const base_url = "https://799twrl4-8081.euw.devtunnels.ms";
const user = JSON.parse(localStorage.getItem("user")) || false;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    // path fro get all product list by restaurant id
    getProduct: builder.query({
      query: () => ({
        url: `/get/products/${user?.user?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["order"],
    }),

    getOrder: builder.query({
      query: (id) => ({
        url: `get/myOrders/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["order"],
    }),

    getwOrder: builder.query({
      query: () => ({
        url: `get/wOrders/${user?.user?.user_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetProductQuery, useGetOrderQuery, useGetwOrderQuery } =
  orderApi;
