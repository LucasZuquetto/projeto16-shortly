import { Router } from "express";
import {
   getUrlByIdController,
   openShortUrlController,
   postShortenUrl,
} from "../controllers/urlsController.js";
import validateAuthToken from "../middlewares/sessionMiddleware.js";
import {
   shortenMiddleware,
   getUrlByIdMiddleware,
   openShortUrlMiddleware,
} from "../middlewares/urlsMiddleware.js";

const urlsRouter = Router();

urlsRouter.post(
   "/urls/shorten",
   validateAuthToken,
   shortenMiddleware,
   postShortenUrl
);
urlsRouter.get("/urls/:id", getUrlByIdMiddleware, getUrlByIdController);
urlsRouter.get("/urls/open/:shortUrl",openShortUrlMiddleware,openShortUrlController);

export default urlsRouter;
