 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    isLoading : false,
    productList:[]
}

export const fetchAllFilterProducts = createAsyncThunk(
  "/product/fetchAllProducts",
  async (formData) => {
    const result = await axios.get("/api/shop/products/get")
    
    console.log(result,"result")
    return result?.data;
  }
);

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers : (builder)=> {
        builder.addCase(fetchAllFilterProducts.pending,(state,action)=> {
            state.isLoading = true            
        }).addCase(fetchAllFilterProducts.fulfilled,(state,action)=> {
            // console.log(action.payload.data,"fullfilled")
            state.isLoading = false   
            state.productList = action.payload.data;         
        }).addCase(fetchAllFilterProducts.rejected,(state,action)=> {
            console.log(action.payload)
            state.isLoading = false   
            state.productList = [];         
        })
    }
}) 


export default shoppingProductsSlice.reducer;