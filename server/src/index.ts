// library
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// app
const app = express();

// middleware
app.listen(3001, () => console.log("server is running"));
app.use(cors());

mongoose.connect(
  "mongodb+srv://superadmin:paresthejs01!@ecommerce.hqasyo1.mongodb.net/ecommerce?retryWrites=true&w=majority"
);
