// library
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// router
import { Router, Request, Response } from "express";

// model
import { UserModel, IUser } from "../models/user";

// error handling
import { UserErrors } from "../error";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ type: UserErrors.USER_ALREADY_EXISTS });
    }

    // create user & hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashPassword });
    await newUser.save();

    res.json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    // check password is match
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// middleware
export const verifyToken = async (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }

      next();
    });
  } else {
    return res.sendStatus(401);
  }
};
export { router as userRouter };
