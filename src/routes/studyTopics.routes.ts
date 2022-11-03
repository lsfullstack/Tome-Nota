import { Router } from "express";
import createStudyTopicController from "../controllers/studyTopics/createStudyTopics.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const studyTopicsRoutes = Router();

studyTopicsRoutes.post("", ensureAuthMiddleware, createStudyTopicController);

export default studyTopicsRoutes;