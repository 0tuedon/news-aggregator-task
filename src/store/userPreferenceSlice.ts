import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPreferencesState {
    authors: string[];
    categories: string[];
    sources: string[];
}

export const initialPreferenceState: UserPreferencesState = {
  authors: [],
  categories: [],
  sources: [],
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
   initialState:initialPreferenceState,
  reducers: {
    setAuthors: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setSources: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    addAuthor: (state, action: PayloadAction<string>) => {
        state.authors.push(action.payload);
      },
      addCategory: (state, action: PayloadAction<string>) => {
        state.categories.push(action.payload);
      },
      addSource: (state, action: PayloadAction<string>) => {
        state.sources.push(action.payload);
      },
      removeAuthor: (state, action: PayloadAction<number>) => {
        state.authors.splice(action.payload, 1);
      },
      removeCategory: (state, action: PayloadAction<number>) => {
        state.categories.splice(action.payload, 1);
      },
      removeSource: (state, action: PayloadAction<number>) => {
        state.sources.splice(action.payload, 1);
      },
  },
});

export const {
    setAuthors,
    setCategories,
    setSources,
    addAuthor,
    addCategory,
    addSource,
    removeAuthor,
    removeCategory,
    removeSource,
  } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
