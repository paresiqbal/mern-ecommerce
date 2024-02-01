// monggose
import { Schema, model } from "mongoose";

export interface IProduct {
  productName: string;
  price: number;
  description: string;
  stockQuantity: number;
  imageURL: string;
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 0"],
  },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  stockQuantity: {
    type: Number,
    required: true,
    min: [1, "Stock must be greater than 0"],
  },
});

export const ProductModel = model<IProduct>("Product", productSchema);
