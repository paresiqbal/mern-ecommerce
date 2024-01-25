// library
import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  availMoney: number;
  // purchaseItems: string[];
}

const UserSchema = new Schema<IUser>({
  // mongoDB auto create id
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availMoney: { type: Number, required: true, default: 100000 },
  // purchase
});

export const UserModel = model<IUser>("User", UserSchema);
