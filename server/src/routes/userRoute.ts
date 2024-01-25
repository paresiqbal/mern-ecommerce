// library
import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// models
import { IUser, UserModel } from "../models/User";

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

// route to login account
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // search user in collection
    const user: IUser = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    // compare hash password in collection with user input password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIAL });
    }

    const token = jwt.sign({ id: user._id }, "secrete");
    res.json({ token, userID: user._id });
  } catch (error) {
    console.error("Error:", error);
  }
});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secrete", (err, user) => {
      if (err) {
        return res.status(403);
      }

      next();
    });
  }

  return res.sendStatus(401);
};

export { router as userRouter };