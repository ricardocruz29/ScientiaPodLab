import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const episodeApiSlice = createApi({
  reducerPath: "episodeApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/episodes" }),
  endpoints: (builder) => ({
    getPodcastEpisodes: builder.query({
      query: ({ podcastID }) => ({
        url: `/podcast/${podcastID}`,
        method: "GET",
      }),
    }),
    getEpisode: builder.query({
      query: ({ episodeID }) => ({
        url: `/${episodeID}`,
        method: "GET",
      }),
    }),
    deleteEpisode: builder.mutation({
      query: ({ episodeID }) => ({
        url: `/${episodeID}`,
        method: "DELETE",
      }),
    }),
    createEpisode: builder.mutation({
      query: (episodeData) => ({
        url: "",
        method: "POST",
        data: episodeData,
      }),
    }),
    updateEpisode: builder.mutation({
      query: ({ episodeData, episodeID }) => ({
        url: `/${episodeID}`,
        method: "PUT",
        data: episodeData,
      }),
    }),
    renderEpisode: builder.mutation({
      query: ({ data, episodeID }) => ({
        url: `/${episodeID}/render`,
        method: "POST",
        data,
      }),
    }),
    publishEpisode: builder.mutation({
      query: ({ episodeID }) => ({
        url: `/${episodeID}/publish`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetPodcastEpisodesQuery,
  useGetEpisodeQuery,
  useDeleteEpisodeMutation,
  useCreateEpisodeMutation,
  useUpdateEpisodeMutation,
  useRenderEpisodeMutation,
  usePublishEpisodeMutation,
} = episodeApiSlice;
