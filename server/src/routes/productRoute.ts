// library
import { Router, Response, Request } from "express";

// model
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";

// middleware
// import { verifyToken } from "./userRoute";
import { ProductErrors, UserErrors } from "../error";

const router = Router();

// get all products
router.get("/", async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});

    res.json({ products });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// add product to cart
router.post("/checkout", async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;
  try {
    const user = await UserModel.findById(customerID);
    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    // check error
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductErrors.PRODUCT_NOT_FOUND });
    }

    // track total price
    let totalPrice = 0;

    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);
      if (!product) {
        return res.status(400).json({ type: ProductErrors.PRODUCT_NOT_FOUND });
      }
      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_MONEY });
    }

    // subtrack user money to total price items
    user.availMoney -= totalPrice;
    user.purchaseItems.push(...productIDs);

    // update database
    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchaseItems: user.purchaseItems });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { router as productRouter };
