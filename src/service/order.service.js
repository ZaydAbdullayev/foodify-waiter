import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://lncxlmks-8081.inc1.devtunnels.ms";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    // path fro get all product list by restaurant id
    getProduct: builder.query({
      query: (id) => ({
        url: `/get/product/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetProductQuery } = orderApi;
