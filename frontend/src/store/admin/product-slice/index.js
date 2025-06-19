 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/product/addnewproduct",
  async (formData) => {
    const result = await axios.post("/api/admin/products/add",formData,{
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
    const result = await axios.get("/api/admin/products/get")
    return result?.data;
  }
);
export const deteleProduct = createAsyncThunk(
  "/product/deteleProduct",
  async (id) => {
    const result = await axios.delete(`/api/admin/products/delete/${id}`)
    return result?.data;
  }
);
export const editaProduct = createAsyncThunk(
  "/product/editaproduct",
  async ({id,formData}) => {
    const result = await axios.put(`/api/admin/products/edit/${id}`,formData,{
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
       console.log(action.payload.data)
        state.isLoading = false 
       state.productList = action.payload.data
    }).addCase(fetchAllProducts.rejected,(state,action) => {
        state.isLoading = false 
       state.productList = []
    })
  },
});


export default AdminProductSlice.reducer