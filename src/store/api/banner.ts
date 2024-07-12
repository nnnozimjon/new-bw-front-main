import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannerApi = createApi({
  reducerPath: "banner",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getAllBanners: build.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
    }),
    getContacts: build.query({
      query: () => ({
        url: '/contacts',
        method: "GET"
      })
    })
  }),
});

export const { useGetAllBannersQuery, useGetContactsQuery } = bannerApi;
