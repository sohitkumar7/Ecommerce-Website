 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
  isLoading: false,
  productList: [],
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const addNewProduct = createAsyncThunk(
  "/product/addnewproduct",
  async (formData) => {
    const result = await axios.post(`${API_BASE_URL}/api/admin/products/add`,formData,{
        headers:{
            'content-Type' : 'application/json' 
        }       
    } )
    return result?.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/product/fetchAllProducts",
  async (formData) => {
    const result = await axios.get(`${API_BASE_URL}/api/admin/products/get`)
    return result?.data;
  }
);
export const deteleProduct = createAsyncThunk(
  "/product/deteleProduct",
  async (id) => {
    const result = await axios.delete(`${API_BASE_URL}/api/admin/products/delete/${id}`)
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/product/editaproduct",
  async ({id,formData}) => {
    const result = await axios.put(`${API_BASE_URL}/api/admin/products/edit/${id}`,formData,{
        headers:{
            'content-Type' : 'application/json' 
        }       
    } )
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending,(state)=>{
        state.isLoading = true
    }).addCase(fetchAllProducts.fulfilled,(state,action) => {
      //  console.log(action.payload.data)
        state.isLoading = false 
       state.productList = action.payload.data
    }).addCase(fetchAllProducts.rejected,(state,action) => {
        state.isLoading = false 
       state.productList = []
    })
  },
});


export default AdminProductSlice.reducer