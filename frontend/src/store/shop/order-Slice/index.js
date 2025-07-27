import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post("/api/shop/order/create", orderData);
    
    return response.data;
  }
);
export const capturePayment = createAsyncThunk(
  "/order/captureOrder",
  async ({paymentId,payerId,orderId}) => {
    const response = await axios.post("/api/shop/order/capture", {
      paymentId,payerId,orderId
    });
    
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.pending,(state) => {
        state.isLoading = true
    }).addCase(createNewOrder.fulfilled,(state,action) => {
        state.isLoading = true
        state.approvalURL = action.payload.approvalUrl
        state.orderId = action.payload.orderId
        sessionStorage.setItem('CurrentOrderId',JSON.stringify(action?.payload?.orderId))
    }).addCase(createNewOrder.rejected,(state) => {
        state.isLoading = true
        state.approvalURL = null
        state.orderId = null
    })
  },
});

export default shoppingOrderSlice.reducer;
