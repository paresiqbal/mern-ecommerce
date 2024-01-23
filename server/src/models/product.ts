// library
import { Schema, model } from "mongoose";

export interface IProduct {
  product_name: string;
  price: number;
  description: string;
  imageURL: string;
  stock: number;
}

const productScema = new Schema<IProduct>({
  product_name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Price of product must be above than 0"],
  },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  stock: {
    type: Number,
    required: true,
    min: [1, "Stock must be above than 0"],
  },
});

export const ProductModel = model<IProduct>("Product", productScema);
