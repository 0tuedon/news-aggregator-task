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
  baseQuery: fetchBaseQuery({ baseUrl:NEWS_API_BASE_URL }),
  endpoints: (builder) => ({
    getFromNewsAPI: builder.query<NewsAPIType, string>({
      query: (query) => `everything?apiKey=${NEWS_API}&q=${query}`,
    }),
  }),
})

export const guardianAPI = createApi({
  reducerPath: 'guardianAPI',
  baseQuery: fetchBaseQuery({ baseUrl:GUARDIAN_BASE_URL }),
  endpoints: (builder) => ({
    getFromGuardianAPI: builder.query<GuardianType, string>({
      query: (query) => `search?api-key=${GUARDIAN_API}&q=${query}`,
    }),
  }),
})

export const nytAPI = createApi({
  reducerPath: 'nytAPI',
  baseQuery: fetchBaseQuery({ baseUrl:NYT_BASE_URL}),
  endpoints: (builder) => ({
    getFromNYTAPI: builder.query<NYTAPIType, string>({
      query: (query) => `articlesearch.json?api-key=${NYT_API}&q=${query}`,
    }),
  }),
})



export const { useGetFromNewsAPIQuery } = newsAPI;
export const { useGetFromGuardianAPIQuery } = guardianAPI;
export const { useGetFromNYTAPIQuery } = nytAPI;
