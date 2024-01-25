// library
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";

// models
import { UserModel } from "../models/User";

// error handling
import { UserErrors } from "../error";

const router = Router();

// route to register account
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    // hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ type: error });
  }
});

export { router as userRouter };
