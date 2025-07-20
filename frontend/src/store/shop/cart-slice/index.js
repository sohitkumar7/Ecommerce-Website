import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post("/api/shop/cart/add", {
      userId,
      productId,
      quantity,
    });

    return response.data;
  }
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId }) => {
    const response = await axios.get(`/api/shop/cart/get/${userId}`);

    return response.data;
  }
);

export const delterCartItem = createAsyncThunk(
  "cart/delterCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axios.delete(
      `/api/shop/cart/${userId}/${productId}`
    );

    return response.data;
  }
);
export const UpdateCartQuantity = createAsyncThunk(
  "cart/UpdateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put("/api/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
    });

    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = true;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = true;
        state.cartItems = [];
      })
      .addCase(UpdateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateCartQuantity.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(UpdateCartQuantity.rejected, (state) => {
        state.isLoading = true;
        state.cartItems = [];
      })
      .addCase(delterCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delterCartItem.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(delterCartItem.rejected, (state) => {
        state.isLoading = true;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
