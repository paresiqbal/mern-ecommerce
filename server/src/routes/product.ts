// router
import { Router, Request, Response } from "express";

// model
import { ProductModel } from "../models/product";
import { UserModel } from "../models/User";

// route
import { verifyToken } from "./user";

const router = Router();

router.get("/", verifyToken, async (_, res: Response) => {
  // get all product
  try {
    const products = await ProductModel.find({});

    res.json({ products });
  } catch (error) {
    res.status(400).json({ error: "Ups something wrong" });
  }
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findById(customerID);
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Ups something wrong" });
  }
});

export { router as productRouter };
