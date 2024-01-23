// router
import { Router, Request, Response } from "express";

// model
import { ProductModel } from "../models/product";

const router = Router();

router.get("/", async (_, res: Response) => {
  // get all product

  try {
    const products = await ProductModel.find({});

    res.json({ products });
  } catch (error) {
    res.status(400).json({ error: "Ups something wrong" });
  }
});

export { router as productRouter };
