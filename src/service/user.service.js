import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://vsxmzbb6-8081.euw.devtunnels.ms";
const user = JSON.parse(localStorage.getItem("user")) || {};

export const waiterApi = createApi({
  reducerPath: "waiterApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["waiter"],
  endpoints: (builder) => ({
    getWaiter: builder.query({
      query: () => ({
        url: `/api/waiter`,
        method: "GET",
        headers: {},
      }),
      providesTags: ["waiter"],
    }),

    //path for login waiter
    loginWaiter: builder.mutation({
      query: (data) => ({
        url: `/login/worker`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["waiter"],
    }),

    //path for logout waiter
    checkDep: builder.mutation({
      query: (pin) => ({
        url: `/check/worker/${user?.user?.id}/${pin}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetWaiterQuery,
  useLoginWaiterMutation,
  useCheckDepMutation,
} = waiterApi;
