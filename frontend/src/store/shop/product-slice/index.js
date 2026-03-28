import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@api";

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

    const result = await api.get(`/api/shop/products/get?${query}`);
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/product/fetchProductDetails",
  async (id) => {
    const result = await api.get(`/api/shop/products/get/${id}`);
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
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      }).addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail  = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetail  = null;
      });
  },
});
export const {setProductDetails} = shoppingProductsSlice.actions
export default shoppingProductsSlice.reducer;
