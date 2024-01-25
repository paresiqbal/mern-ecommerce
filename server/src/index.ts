// library
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connection DB
mongoose.connect(
  "mongodb+srv://ecommerce:proccess.env.MONGO_PASSWORD@ecommerce.iaknqjh.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server is running on port 3001"));
