import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductSlice from "./admin/product-slice/index.js"
import shopProductSlice from "./shop/product-slice/index.js"


const store = configureStore({
    reducer:{
       auth: authReducer,
       adminProducts:AdminProductSlice,
       shopProducts : shopProductSlice 
    }, 
})

export default store;