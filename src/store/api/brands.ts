import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brands",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getAllBrands: build.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBrandsQuery } = brandsApi;
