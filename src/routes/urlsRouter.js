import { Router } from "express";
import {
   deleteUrlController,
   getUrlByIdController,
   openShortUrlController,
   postShortenUrl,
} from "../controllers/urlsController.js";
import validateAuthToken from "../middlewares/sessionMiddleware.js";
import {
   shortenMiddleware,
   validateUrlById,
   openShortUrlMiddleware,
   deleteUrlMiddleware,
} from "../middlewares/urlsMiddleware.js";

const urlsRouter = Router();

urlsRouter.post(
   "/urls/shorten",
   validateAuthToken,
   shortenMiddleware,
   postShortenUrl
);
urlsRouter.get("/urls/:id", validateUrlById, getUrlByIdController);
urlsRouter.get(
   "/urls/open/:shortUrl",
   openShortUrlMiddleware,
   openShortUrlController
);
urlsRouter.delete(
   "/urls/:id",
   validateAuthToken,
   validateUrlById,
   deleteUrlMiddleware,
   deleteUrlController
);

export default urlsRouter;
