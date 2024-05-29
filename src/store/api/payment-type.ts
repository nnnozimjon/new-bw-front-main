import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentTypeApi = createApi({
  reducerPath: "paymentType",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getAllPaymentTypes: build.query({
      query: () => ({
        url: "/paymentTypes",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPaymentTypesQuery } = paymentTypeApi;
