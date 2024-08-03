import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const podcastService = createApi({
  reducerPath: "podcastService",
  baseQuery: axiosBaseQuery({ baseUrl: "/podcasts" }),
  tagTypes: ["Podcasts"], // Add your tag types here
  endpoints: (builder) => ({
    getPodcasts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Podcasts"],
    }),
    getPodcast: builder.query({
      query: ({ podcastID }) => ({
        url: `/${podcastID}`,
        method: "GET",
      }),
    }),
    deletePodcast: builder.mutation({
      query: ({ podcastID }) => ({
        url: `/${podcastID}`,
        method: "DELETE",
      }),
    }),
    createPodcast: builder.mutation({
      query: (podcastData) => ({
        url: "/",
        method: "POST",
        data: podcastData,
      }),
      invalidatesTags: ["Podcasts"],
    }),
    updatePodcast: builder.mutation({
      query: ({ podcastData, podcastID }) => ({
        url: `/${podcastID}`,
        method: "PUT",
        data: podcastData,
      }),
      invalidatesTags: ["Podcasts"],
    }),
  }),
});

export const {
  useGetPodcastsQuery,
  useGetPodcastQuery,
  useDeletePodcastMutation,
  useCreatePodcastMutation,
  useUpdatePodcastMutation,
} = podcastService;
