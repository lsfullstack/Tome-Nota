import { Router } from "express";
import createLessonController from "../controllers/lessons/createLesson.controller";
import deleteLessonController from "../controllers/lessons/deleteLesson.controller";
import listLessonsController from "../controllers/lessons/listLessons.controller";
import retriveLessonController from "../controllers/lessons/retrieveLesson.controller";
import updateLessonController from "../controllers/lessons/updateLesson.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const lessonRoutes = Router();

lessonRoutes.post("/:id", ensureAuthMiddleware, createLessonController);
lessonRoutes.patch("/:id", ensureAuthMiddleware, updateLessonController);
lessonRoutes.get("/:id", ensureAuthMiddleware, retriveLessonController);
lessonRoutes.get("/study-topic/:id", ensureAuthMiddleware, listLessonsController);
lessonRoutes.delete("/:id", ensureAuthMiddleware, deleteLessonController);

export default lessonRoutes;