import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const segmentApiSlice = createApi({
  reducerPath: "segmentApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/segments" }),
  endpoints: (builder) => ({
    deleteTemplateSegment: builder.mutation({
      query: ({ templateSegmentID }) => ({
        url: `/${templateSegmentID}/template`,
        method: "DELETE",
      }),
    }),
    createTemplateSegment: builder.mutation({
      query: (templateSegmentData) => ({
        url: "/template",
        method: "POST",
        data: templateSegmentData,
      }),
    }),
    deleteEpisodeSegment: builder.mutation({
      query: ({ episodeSegmentID }) => ({
        url: `/${episodeSegmentID}/episode`,
        method: "DELETE",
      }),
    }),
    createEpisodeSegment: builder.mutation({
      query: (episodeSegmentData) => ({
        url: "/episode",
        method: "POST",
        data: episodeSegmentData,
      }),
    }),
  }),
});

export const {
  useDeleteTemplateSegmentMutation,
  useCreateTemplateSegmentMutation,
  useDeleteEpisodeSegmentMutation,
  useCreateEpisodeSegmentMutation,
} = segmentApiSlice;
