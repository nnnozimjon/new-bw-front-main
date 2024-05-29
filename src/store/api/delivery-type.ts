import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deliverTypeApi = createApi({
  reducerPath: "deliveryType",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getAllDeliveryTypes: build.query({
      query: () => ({
        url: "/deliveryType",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDeliveryTypesQuery } = deliverTypeApi;
