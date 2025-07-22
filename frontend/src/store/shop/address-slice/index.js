import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAdress",
  async (formData) => {
    const response = await axios.post(`/api/shop/address/add`, formData);
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
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `/api/shop/address//update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const DeleteAddress = createAsyncThunk(async ({ userId, addressId }) => {
  const response = await axios.delete(
    `/api/shop/address/detele/${userId}/${addressId}`
  );

  return response.data;
});

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewAddress.pending,(state, action) => {
        state.isLoading = true;
    }).addCase(addNewAddress.fulfilled,(state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data
    }).addCase(addNewAddress.rejected,(state, action) => {
        state.isLoading = false;
        state.addressList = []
    }).addCase(fetchAllAdress.pending,(state, action) => {
        state.isLoading = true;
    }).addCase(fetchAllAdress.fulfilled,(state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data
    }).addCase(fetchAllAdress.rejected,(state, action) => {
        state.isLoading = false;
        state.addressList = []
    })
  },
});


export default addressSlice.reducer;
