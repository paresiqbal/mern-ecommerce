// library
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// router
import { userRouter } from "./routes/user";

// app
const app = express();

// middleware
app.listen(3001, () => console.log("server is running"));
app.use(cors());

// route
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://pares:pares123@ecommerce.0rsczwh.mongodb.net/?retryWrites=true&w=majority"
);
