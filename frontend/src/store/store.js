import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/product-slice/index.js";
import shopProductSlice from "./shop/product-slice/index.js";
import shopCartSlice from "./shop/cart-slice/index.js";
import shopAddressSlice from "./shop/address-slice/index.js";
import shopOrderSlice from "../store/shop/order-Slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress : shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
