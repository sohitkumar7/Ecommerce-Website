import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./Routes/auth-routes.js";
import adminProductsRouter from "./Routes/admin/product-route.js";
import shopProductRoutes from "./Routes/Shop/products-route.js";
import CartRouter from "./Routes/Shop/Cart-route.js";
import ShopAddressRouter from "./Routes/Shop/address-route.js";
import ShopOrderRouter from "./Routes/Shop/order-routes.js";
import AdminOrderRouter from "./Routes/admin/order-routes.js";
import ShopSearchRouter from "./Routes/Shop/search-routes.js";
import shopReviewRouter from "./Routes/Shop/review-route.js";
import commonfeatureRouter from "./Routes/common/feature-route.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-website-henna-mu.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.use("/api/auth", router);
    app.use("/api/admin/products", adminProductsRouter);
    app.use("/api/admin/orders", AdminOrderRouter);
    app.use("/api/shop/products", shopProductRoutes);
    app.use("/api/shop/cart", CartRouter);
    app.use("/api/shop/address", ShopAddressRouter);
    app.use("/api/shop/order", ShopOrderRouter);
    app.use("/api/shop/search", ShopSearchRouter);
    app.use("/api/shop/review", shopReviewRouter);
    app.use("/api/common/feature", commonfeatureRouter);

    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

startServer();
