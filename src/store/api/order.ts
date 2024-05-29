import { usingBearerToken } from "@/hooks";
import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getUserOrders: build.query({
      query: () => ({
        url: "/order/userorders",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    getOrderById: build.query({
      query: ({ id }) => ({
        url: "/order/" + id,
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetUserOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation } = orderApi;
