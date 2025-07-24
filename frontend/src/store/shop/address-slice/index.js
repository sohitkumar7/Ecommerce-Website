import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAdress",
  async (formData) => {
    console.log(formData);
    const response = await axios.post("/api/shop/address/add", formData);
    console.log("in add new address");
    return response.data;
  }
);

export const fetchAllAdress = createAsyncThunk(
  "/addresses/fetchAllAdress",
  async (userId) => {
    const response = await axios.get(`/api/shop/address/get/${userId}`);

    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "address/editaddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const DeleteAddress = createAsyncThunk(
  "address/deleteadress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `/api/shop/address/delete/${userId}/${addressId}`
    );

    console.log(response);

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(fetchAllAdress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAdress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAdress.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(DeleteAddress.pending, (state, action) => {
        state.isLoading = true;
        console.log(" not Addressdeleted");
      })
      .addCase(DeleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Addressdeleted");
        // state.addressList = action.payload.data
      })
      .addCase(DeleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        console.log(" not Addressdeleted");
      });
  },
});

export default addressSlice.reducer;
