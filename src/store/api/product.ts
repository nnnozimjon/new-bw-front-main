import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getProductById: build.query({
      query: ({ id }) => ({
        url: "/product/" + id,
        method: "GET",
      }),
    }),
    getProductByFilter: build.query({
      query: (query) => ({
        url: `/product/filtration${query}&HideProduct=false`,
        method: "GET",
      }),
    }),
    getProductByHide: build.query({
      query: (query) => ({
        url: `/product/getproductbyhide${query}`,
        method: "GET",
      }),
    }),
    addComment: build.mutation({
      query: (body) => ({
        url: "/comment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProductByHideQuery,
  useGetProductByIdQuery,
  useAddCommentMutation,
  useGetProductByFilterQuery,
} = productApi;
