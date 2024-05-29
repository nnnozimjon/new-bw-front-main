import { usingBearerToken } from "@/hooks";
import { baseUrl } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ILoginCredentials {
  phoneNumber: string;
}

interface IRegisterCredentials {
  phoneNumber: string;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials: ILoginCredentials) => ({
        url: "/loginphone",
        method: "POST",
        body: credentials,
      }),
    }),
    loginByEmail: build.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    registration: build.mutation({
      query: (credentials: IRegisterCredentials) => ({
        url: "/phoneregitration",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    updateProfile: build.mutation({
      query: (form) => ({
        url: "/users/profile",
        method: "PUT",
        body: form,
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetProfileQuery,
  useLoginByEmailMutation,
  useUpdateProfileMutation,
} = authApi;
