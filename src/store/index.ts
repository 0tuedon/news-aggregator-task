import { configureStore } from '@reduxjs/toolkit';
import { newsAPI } from '../services';
import filtersReducer from './filtersSlice';
import userPreferencesReducer, { UserPreferencesState } from './userPreferenceSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore} from 'redux-persist';


type PersistedUserPreferencesState = UserPreferencesState


const userPreferencesPersistConfig = {
  key: "userPreferences",
  storage,
};


const persistedUserPreferencesReducer = persistReducer<PersistedUserPreferencesState>(
  userPreferencesPersistConfig,
  userPreferencesReducer
);

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    userPreferences: persistedUserPreferencesReducer,
    [newsAPI.reducerPath]: newsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(newsAPI.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
