import { Router } from "express";
import rankingController from "../controllers/rankingController.js";

const rankingRouter = Router();

rankingRouter.get("/ranking", rankingController);

export default rankingRouter;
