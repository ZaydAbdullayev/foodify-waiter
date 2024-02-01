import { apiSlice } from "./frame.service";
const user = JSON.parse(localStorage.getItem("user")) || false;

export const orderApi = apiSlice.injectEndpoints({
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
        url: `get/waiter/orders/${user?.user?.id}/2024-01-10/2024-02-01`,
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
