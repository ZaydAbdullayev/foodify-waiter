import { apiSlice } from "./frame.service";
const user = JSON.parse(localStorage.getItem("user")) || [];

export const waiterApi = apiSlice.injectEndpoints({
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
