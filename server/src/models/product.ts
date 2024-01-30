// monggose
import { Schema, model } from "mongoose";

export interface IProduct {
  productName: string;
  price: number;
  descripttion: string;
  imageUrl: string;
  stockQuantity: number;
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 0"],
  },
  descripttion: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stockQuantity: {
    type: Number,
    required: true,
    min: [1, "Stock must be greater than 0"],
  },
});

export const ProductModel = model<IProduct>("Product", productSchema);
