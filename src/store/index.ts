import { configureStore } from '@reduxjs/toolkit';
import { newsAPI } from '../services';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [newsAPI.reducerPath]: newsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(newsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
