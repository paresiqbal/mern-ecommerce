// library
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// router
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

// app
const app = express();

// middleware
app.listen(3001, () => console.log("server is running"));
app.use(express.json());
app.use(cors());

// route
app.use("/user", userRouter);
app.use("/product", productRouter);

mongoose.connect(
  "mongodb+srv://pares:pares123@ecommerce.0rsczwh.mongodb.net/?retryWrites=true&w=majority"
);
