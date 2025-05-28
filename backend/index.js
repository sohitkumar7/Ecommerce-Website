import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Routes/auth-routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json())

const mongodb_uri = process.env.mongodb_uri;
const port = process.env.PORT;
try {
    mongoose.connect(mongodb_uri);
    console.log("mongoDB connect successfully")
} catch (error) {
    console.log("Error in connection of mongodb")
}

app.use("/api/auth",router);

app.listen(port,()=> {
    console.log("server is listening in port ",port);
})