import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GuardianType, NewsAPIType, NYTAPIType } from "../types";
import { FiltersState } from "../store/filtersSlice";
import { buildAPIQuery } from "../utils";
import { UserPreferencesState } from "../store/userPreferenceSlice";
import { use } from "react";

export type NewsQuery = {query:FiltersState, userPreferences:UserPreferencesState }
export const newsAPI = createApi({
  reducerPath: "newsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // will override the base URL for each endpoint
  endpoints: (builder) => ({
    getFromNewsAPI: builder.query<NewsAPIType, NewsQuery >({
      query: ({query, userPreferences}) => {
        return {
          url:buildAPIQuery(query, "newsAPI",userPreferences),
        };
      },
    }),
    getFromGuardianAPI: builder.query<GuardianType, NewsQuery>({
      query: ({query, userPreferences}) => ({
        url: buildAPIQuery(query, "guardian", userPreferences),
      }),
    }),
    getFromNYTAPI: builder.query<NYTAPIType, NewsQuery>({
      query: ({query, userPreferences}) => ({
        url: buildAPIQuery(query, "nyt", userPreferences),
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
