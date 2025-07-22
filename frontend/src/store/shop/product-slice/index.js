import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetail : null
};

export const fetchAllFilterProducts = createAsyncThunk(
  "/product/fetchAllProducts",
  async ({ filtersParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filtersParams,
      sortBy: sortParams,
    });

    const result = await axios.get(`/api/shop/products/get?${query}`);
    // console.log(result,"result")
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/product/fetchProductDetails",
  async (id) => {
    const result = await axios.get(`/api/shop/products/get/${id}`);
    // console.log(result,"result")
    return result?.data;
  }
);

const shoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails : (state) => {
      state.productDetail = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
        // console.log(action.payload.data,"fullfilled")
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilterProducts.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = [];
      }).addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        // console.log(action.payload.data,"fullfilled")
        state.isLoading = false;
        state.productDetail  = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.productDetail  = null;
      });
  },
});
export const {setProductDetails} = shoppingProductsSlice.actions
export default shoppingProductsSlice.reducer;
