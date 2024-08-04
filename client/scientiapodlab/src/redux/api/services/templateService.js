import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosClient/axiosBaseQuery";

export const templateService = createApi({
  reducerPath: "templateService",
  baseQuery: axiosBaseQuery({ baseUrl: "/templates" }),
  tagTypes: ["template"],
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["template"],
    }),
    getTemplate: builder.query({
      query: ({ templateID }) => ({
        url: `/${templateID}`,
        method: "GET",
      }),
      providesTags: ["template"],
    }),
    deleteTemplate: builder.mutation({
      query: ({ templateID }) => ({
        url: `/${templateID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["template"],
    }),
    createTemplate: builder.mutation({
      query: (templateData) => ({
        url: "/",
        method: "POST",
        data: templateData,
      }),
      invalidatesTags: ["template"],
    }),
    updateTemplate: builder.mutation({
      query: ({ templateData, templateID }) => ({
        url: `/${templateID}`,
        method: "PUT",
        data: templateData,
      }),
      invalidatesTags: ["template"],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateQuery,
  useLazyGetTemplateQuery,
  useLazyGetTemplatesQuery,
  useDeleteTemplateMutation,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} = templateService;
