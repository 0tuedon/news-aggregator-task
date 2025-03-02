import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {format} from "date-fns";
export interface FiltersState {
  keyword: string;
  category: string;
  dateFrom:string;
  dateTo:string;
  sources: string[];
  isPersonalized?:boolean;
}

const initialState: FiltersState = {
  keyword: '',
  category: '',
  isPersonalized: false,
  sources: ['newsAPI', 'guardian', 'nyt'],
  dateFrom: format(new Date().toISOString(), "yyyy-MM-dd"),
  dateTo: format(new Date().toISOString(), "yyyy-MM-dd"),
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
    setDateFrom(state, action: PayloadAction<string>) {
      state.dateFrom = action.payload;
    },
    setDateTo(state, action: PayloadAction<string>) {
      state.dateTo = action.payload;
    },
    setSources(state, action: PayloadAction<string[]>) {
      state.sources = action.payload;
    },
    setPersonalized(state, action: PayloadAction<boolean>) {
      state.isPersonalized = action.payload;
    },
    clearFilters(state) {
      state.keyword = '';
      state.category = '';
      state.sources = ['newsAPI', 'guardian', 'nyt'];
      state.dateFrom = format(new Date().toISOString(), "yyyy-MM-dd");
      state.dateTo = format(new Date().toISOString(), "yyyy-MM-dd");
    }
  },
});

export const { setKeyword, setCategory, setSources, setPersonalized, setDateFrom, setDateTo, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
