import { Router } from "express";
import createStudyTopicController from "../controllers/studyTopics/createStudyTopics.controller";
import deleteStudyTopicController from "../controllers/studyTopics/deleteStudyTopic.controller";
import listStudyTopicsController from "../controllers/studyTopics/listStudyTopics.controller";
import retrieveStudyTopicController from "../controllers/studyTopics/retrieveStudyTopic.controller";
import updateStudyTopicController from "../controllers/studyTopics/updateStudyTopic.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const studyTopicsRoutes = Router();

studyTopicsRoutes.post("", ensureAuthMiddleware, createStudyTopicController);
studyTopicsRoutes.get("", ensureAuthMiddleware, listStudyTopicsController);
studyTopicsRoutes.get("/:id", ensureAuthMiddleware, retrieveStudyTopicController);
studyTopicsRoutes.patch("/:id", ensureAuthMiddleware, updateStudyTopicController);
studyTopicsRoutes.delete("/:id", ensureAuthMiddleware, deleteStudyTopicController);

export default studyTopicsRoutes;