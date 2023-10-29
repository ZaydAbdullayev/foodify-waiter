import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const base_url = "https://backend.foodify.uz";
const base_url = "https://lncxlmks-8081.inc1.devtunnels.ms";
const user = JSON.parse(localStorage.getItem("user")) || {};

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["table"],
  endpoints: (builder) => ({
    getTable: builder.mutation({
      query: (location) => ({
        url: `/get/tables/${user?.user?.id}/${location}`,
        method: "POST",
        headers: {},
      }),
    }),

    getLocation: builder.query({
      query: (id) => ({
        url: `/get/tlocations/${user?.user?.id}`,
        method: "GET",
        headers: {},
      }),
      providesTags: ["table"],
    }),

    getTables: builder.query({
      query: (id) => ({
        url: `/get/table/${id}`,
        method: "GET",
        headers: {},
      }),
      providesTags: ["table"],
    }),
  }),
});

export const { useGetLocationQuery, useGetTableMutation, useGetTablesQuery } =
  tableApi;