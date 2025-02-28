import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GuardianType, NewsAPIType, NYTAPIType } from '../types'

const NEWS_API = process.env.REACT_APP_NEWS_API;
const NEWS_API_BASE_URL = `https://newsapi.org/v2/`;


const GUARDIAN_API = process.env.REACT_APP_GUARDIAN_API;
const GUARDIAN_BASE_URL = `https://content.guardianapis.com/`;

const NYT_API = process.env.REACT_APP_NYT_API;
const NYT_BASE_URL = `https://api.nytimes.com/svc/search/v2/`

export const newsAPI = createApi({
  reducerPath: 'newsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // We will override the base URL for each endpoint
  endpoints: (builder) => ({
    getFromNewsAPI: builder.query<NewsAPIType, string>({
      query: (query) => ({
        url: `${NEWS_API_BASE_URL}everything?q=${query}&apiKey=${NEWS_API}`,
      }),
    }),
    getFromGuardianAPI: builder.query<GuardianType, string>({
      query: (query) => ({
        url: `${GUARDIAN_BASE_URL}search?q=${query}&api-key=${GUARDIAN_API}`,
      }),
    }),
    getFromNYTAPI: builder.query<NYTAPIType, string>({
      query: (query) => ({
        url: `${NYT_BASE_URL}articlesearch.json?q=${query}&api-key=${NYT_API}`,
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
