import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/product-slice/index.js";
import shopProductSlice from "./shop/product-slice/index.js";
import shopCartSlice from "./shop/cart-slice/index.js";
import shopAddressSlice from "./shop/address-slice/index.js";
import shopOrderSlice from "../store/shop/order-Slice/index.js";
import adminOrderSlice from "../store/admin/order-slice/index.js";
import shopSearchSlice from "../store/shop/search-slice/index.js";
import shopReviewSlice from "../store/shop/Review-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    
    adminProducts: AdminProductSlice,
    adminOrder: adminOrderSlice,
    
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress : shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

  },
});

export default store;
