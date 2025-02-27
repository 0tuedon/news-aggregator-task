import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  keyword: string;
  category: string;
  source: string;
}

const initialState: FiltersState = {
  keyword: '',
  category: '',
  source: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSource(state, action: PayloadAction<string>) {
      state.source = action.payload;
    },
  },
});

export const { setKeyword, setCategory, setSource } = filtersSlice.actions;
export default filtersSlice.reducer;
