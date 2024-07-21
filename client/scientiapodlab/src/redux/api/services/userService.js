import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: axiosBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        data: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        data: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "user/",
        method: "GET",
      }),
    }),
    disableOnboarding: builder.mutation({
      query: () => ({
        url: "user/disable-onboarding",
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useDisableOnboardingMutation,
} = userService;
