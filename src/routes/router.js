import { Router } from "express";
import authRouter from "./authRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersInfoRouter from './usersInfoRouter.js';

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(usersInfoRouter)

export default router;
