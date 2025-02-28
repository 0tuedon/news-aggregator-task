import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GuardianType, NewsAPIType, NYTAPIType } from "../types";
import { FiltersState } from "../store/filtersSlice";
import { buildAPIQuery } from "../utils";

export const newsAPI = createApi({
  reducerPath: "newsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // We will override the base URL for each endpoint
  endpoints: (builder) => ({
    getFromNewsAPI: builder.query<NewsAPIType, FiltersState >({
      query: (query) => {
        return {
          url:buildAPIQuery(query, "newsAPI"),
        };
      },
    }),
    getFromGuardianAPI: builder.query<GuardianType, FiltersState>({
      query: (query) => ({
        url: buildAPIQuery(query, "guardian"),
      }),
    }),
    getFromNYTAPI: builder.query<NYTAPIType, FiltersState>({
      query: (query) => ({
        url: buildAPIQuery(query, "nyt"),
      }),
    }),
  }),
});

// Export Hooks
export const {
  useGetFromNewsAPIQuery,
  useGetFromGuardianAPIQuery,
  useGetFromNYTAPIQuery,
} = newsAPI;
