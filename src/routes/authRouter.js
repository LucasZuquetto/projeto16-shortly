import { Router } from 'express';
import { postSignUpController } from '../controllers/authController.js';
import { postSignUpMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = Router()

authRouter.post('/signup',postSignUpMiddleware,postSignUpController)

export default authRouter
