// router
import { Router, Request, Response } from "express";

// model
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";

// route
import { verifyToken } from "./user";
import { ProductErrors, UserErrors } from "../error";

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

router.post("/checkout", async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findById(customerID);
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    if (products.length !== productIDs.length) {
      return res.json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;

    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      // check product
      if (!product) {
        return res.json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stock < cartItems[item]) {
        return res.json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.avMoney < totalPrice) {
      return res.json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.avMoney -= totalPrice;
    user.purchasesItems.push(...productIDs);
    await user.save();

    // decrese quantity product
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stock: -1 } }
    );

    res.json({ purchasesItems: user.purchasesItems });
  } catch (error) {
    res.status(400).json({ error: "Ups something wrong" });
  }
});

export { router as productRouter };
