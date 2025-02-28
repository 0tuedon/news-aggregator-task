import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {format} from "date-fns";
export interface FiltersState {
  keyword: string;
  category: string;
  source: string;
  dateFrom:string;
  dateTo:string;
}

const initialState: FiltersState = {
  keyword: '',
  category: '',
  source: '',
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
    setSource(state, action: PayloadAction<string>) {
      state.source = action.payload;
    },
    clearFilters(state) {
      state.keyword = '';
      state.category = '';
      state.source = '';
      state.dateFrom = format(new Date().toISOString(), "yyyy-MM-dd");
      state.dateTo = format(new Date().toISOString(), "yyyy-MM-dd");
    }
  },
});

export const { setKeyword, setCategory, setSource, setDateFrom, setDateTo, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
