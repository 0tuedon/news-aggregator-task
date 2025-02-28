import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import { guardianAPI, newsAPI, nytAPI } from '../services/news';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [newsAPI.reducerPath]: newsAPI.reducer,
    [guardianAPI.reducerPath]: guardianAPI.reducer,
    [nytAPI.reducerPath]: nytAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(newsAPI.middleware, guardianAPI.middleware, nytAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
