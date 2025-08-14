import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSearchResults = createAsyncThunk(
  "/get/getSearchResults",
  async (keyword) => {
    const response = await axios.get(`${API_BASE_URL}/api/shop/search/${keyword}`);

    return response;
  }
);

const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action?.payload?.data.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});
export const {resetSearchResults} = SearchSlice.actions;
export default SearchSlice.reducer;
