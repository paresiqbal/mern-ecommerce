// library
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

// router
import { userRouter } from "./routes/userRoute";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// route
app.use("/user", userRouter);

// connection DB
mongoose.connect(
  "mongodb+srv://ecommerce:adpyldNMzExDqzsC@ecommerce.iaknqjh.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server is running on port 3001"));
