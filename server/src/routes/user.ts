// library
import {Router, Request, Response} from "express";
import {UserErrors} from "../error";

// model
import { UserModel } from "../models/User";

const router = express.Router();

router.post("/register" async(req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    // check username
    if (user ) {
        return res.status(400).json({type: UserErrors.USER_ALREADY_EXISTS});
    }

    
});

export { router as userRouter };
