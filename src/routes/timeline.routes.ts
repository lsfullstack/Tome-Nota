import { Router } from "express";
import createTimelineController from "../controllers/timeline/createTimeline.controller";
import deleteTimelineController from "../controllers/timeline/deleteTimeline.controller";
import listTimelinesController from "../controllers/timeline/listTimelines.controller";
import updateTimelineController from "../controllers/timeline/updateTimeline.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const timelineRoutes = Router();

timelineRoutes.post("/:id", ensureAuthMiddleware, createTimelineController);
timelineRoutes.get("/:id", ensureAuthMiddleware, listTimelinesController);
timelineRoutes.patch("/:id", ensureAuthMiddleware, updateTimelineController);
timelineRoutes.delete("/:id", ensureAuthMiddleware, deleteTimelineController);

export default timelineRoutes;
