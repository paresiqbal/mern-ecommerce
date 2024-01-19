// library
import { Router, Request, Response } from "express";
import { UserErrors } from "../error";
import bcrypt from "bcrypt";

// model
import { UserModel } from "../models/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ type: UserErrors.USER_ALREADY_EXISTS });
    }

    // create user, hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashPassword });
    await newUser.save();

    res.json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ type: err });
  }
});

export { router as userRouter };
