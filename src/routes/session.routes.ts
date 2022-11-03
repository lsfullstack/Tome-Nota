import { Router } from "express";
import createSessionController from "../controllers/sessions/cretateSession.controller";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController); // falta middleware isActive

export default sessionRoutes;