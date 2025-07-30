import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

const getSearchResult = createAsyncThunk(
  "/get/searchResult",
  async (keyword) => {

    const response = await axios.get(`/api/shop/search/${keyword}`);

    return response;
  }
);

const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending,(state)=>{
        state.isLoading = true
    }).addCase(getSearchResult.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.searchResults = action?.payload?.data;
    }).addCase(getSearchResult.rejected,(state)=>{
        state.isLoading = false;
        state.searchResults = []
    })
  },
});

export default SearchSlice.reducer;
