import { Router } from "express";
import createVideoController from "../controllers/video/createVideo.controller";
import deleteVideoController from "../controllers/video/deleteVideo.controller";
import retrieveVideoController from "../controllers/video/retrieveVideo.controller";
import updateVideoController from "../controllers/video/updateVideo.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const videoRoutes = Router();

videoRoutes.post("/:id", ensureAuthMiddleware, createVideoController);
videoRoutes.get("/:id", ensureAuthMiddleware, retrieveVideoController);
videoRoutes.patch("/:id", ensureAuthMiddleware, updateVideoController);
videoRoutes.delete("/:id", ensureAuthMiddleware, deleteVideoController);

export default videoRoutes;