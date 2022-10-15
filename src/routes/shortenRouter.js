import { Router } from 'express';
import postShortenUrl from '../controllers/shortenController.js';
import validateAuthToken from '../middlewares/sessionMiddleware.js';
import shortenMiddleware from '../middlewares/shortenMiddleware.js';

const shortenRouter = Router()

shortenRouter.post('/urls/shorten',validateAuthToken,shortenMiddleware,postShortenUrl)

export default shortenRouter
