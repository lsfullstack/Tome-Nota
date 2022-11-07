import { Router } from "express";
import createSessionController from "../controllers/sessions/cretateSession.controller";
import ensureIsActiveMiddleware from "../middlewares/ensureIsActive.middleware";

const sessionRoutes = Router();

sessionRoutes.post("", ensureIsActiveMiddleware, createSessionController);


export default sessionRoutes;