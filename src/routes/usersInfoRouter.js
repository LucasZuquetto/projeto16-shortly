import { Router } from "express";
import usersInfoController from "../controllers/usersInfoController.js";
import validateAuthToken from "../middlewares/sessionMiddleware.js";

const usersInfoRouter = Router();

usersInfoRouter.get("/users/me", validateAuthToken, usersInfoController);

export default usersInfoRouter;
