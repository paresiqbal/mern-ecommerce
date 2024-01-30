// library
import { Router, Response } from "express";

// model
import { ProductModel } from "../models/product";

const router = Router();

// get all products
router.get("/", async (_, res: Response) => {
  try {
    const getProducts = await ProductModel.find({});

    res.json(getProducts);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { router as productRouter };
