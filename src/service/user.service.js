import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://lncxlmks-8081.inc1.devtunnels.ms";

export const waiterApi = createApi({
  reducerPath: "waiterApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["waiter"],
  endpoints: (builder) => ({
    getWaiter: builder.query({
      query: () => ({
        url: `/api/waiter`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["waiter"],
    }),

    //path for login waiter
    loginWaiter: builder.mutation({
      query: (data) => ({
        url: `/api/waiter/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["waiter"],
    }),
  }),
});

export const { useGetWaiterQuery, useLoginWaiterMutation } = waiterApi;
