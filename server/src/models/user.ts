import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  avMoney: number;
  //   purchasesItems: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avMoney: { type: Number, default: 5000 },
  //   purchasesItems: { type: Array, default: [] },
});

export const UserModel = model<IUser>("User", UserSchema);
