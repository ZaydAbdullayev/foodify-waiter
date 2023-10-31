import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://lncxlmks-8081.inc1.devtunnels.ms";
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
          "Content-Type": "application/json",
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
  }),
});

export const { useGetProductQuery, useGetOrderQuery } = orderApi;
