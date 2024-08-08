import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const resourceService = createApi({
  reducerPath: "resourceService",
  baseQuery: axiosBaseQuery({ baseUrl: "/resources" }),
  endpoints: (builder) => ({
    getResources: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    deleteResource: builder.mutation({
      query: ({ resourceID }) => ({
        url: `/${resourceID}/`,
        method: "DELETE",
      }),
    }),
    createResource: builder.mutation({
      query: (resourceData) => ({
        url: "/",
        method: "POST",
        data: resourceData,
      }),
    }),
    createTTSResource: builder.mutation({
      query: (resourceData) => ({
        url: "/tts",
        method: "POST",
        data: resourceData,
      }),
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useLazyGetResourcesQuery,
  useDeleteResourceMutation,
  useCreateResourceMutation,
  useCreateTTSResourceMutation,
} = resourceService;
