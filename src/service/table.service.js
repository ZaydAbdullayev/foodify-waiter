import { apiSlice } from "./frame.service";
const user = JSON.parse(localStorage.getItem("user")) || {};

export const tableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTable: builder.mutation({
      query: (location) => ({
        url: `/get/tables/${user?.user?.id}/${location}`,
        method: "POST",
        headers: {},
      }),
      providesTags: ["table"],
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

    // path for ad tables to restaurant
    addTable: builder.mutation({
      query: (table) => ({
        url: `/add/table`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: table,
      }),
      invalidatesTags: ["table"],
    }),
  }),
});

export const {
  useGetLocationQuery,
  useGetTableMutation,
  useGetTablesQuery,
  useAddTableMutation,
} = tableApi;
