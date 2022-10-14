import { Router } from "express";
import {
   postSignInController,
   postSignUpController,
} from "../controllers/authController.js";
import {
   postSignInMiddleware,
   postSignUpMiddleware,
} from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", postSignUpMiddleware, postSignUpController);
authRouter.post("/signin", postSignInMiddleware, postSignInController);

export default authRouter;
