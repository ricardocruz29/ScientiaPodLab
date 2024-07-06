import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const templateApiSlice = createApi({
  reducerPath: "templateApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/templates" }),
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    deleteTemplate: builder.mutation({
      query: ({ templateID }) => ({
        url: `/${templateID}`,
        method: "DELETE",
      }),
    }),
    createTemplate: builder.mutation({
      query: (templateData) => ({
        url: "",
        method: "POST",
        data: templateData,
      }),
    }),
    updateTemplate: builder.mutation({
      query: ({ templateData, templateID }) => ({
        url: `/${templateID}`,
        method: "PUT",
        data: templateData,
      }),
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useDeleteTemplateMutation,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} = templateApiSlice;
