import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  OrderDetails: null,
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
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post("/api/shop/order/capture", {
      paymentId,
      payerId,
      orderId,
    });

    return response.data;
  }
);

export const getAllOrderByUser = createAsyncThunk(
  "/getAllorder/list",
  async (userId) => {
    const response = await axios.get(`/api/shop/order/list/${userId}`);

    return response.data;
  }
);
export const getOrderDetail = createAsyncThunk(
  "/getOrderDetail/list",
  async (id) => {
    const response = await axios.get(`/api/shop/order/details/${id}`);

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = true;
        state.approvalURL = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "CurrentOrderId",
          JSON.stringify(action?.payload?.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = true;
        state.approvalURL = null;
        state.orderId = null;
      })
      
      .addCase(getAllOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action?.payload?.data
      })
      .addCase(getAllOrderByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = []
      })

      .addCase(getOrderDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderDetails = action?.payload?.data
      })
      .addCase(getOrderDetail.rejected, (state) => {
        state.isLoading = false;
        state.OrderDetails = null
      })


  },
});

export default shoppingOrderSlice.reducer;
