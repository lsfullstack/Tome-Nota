import { Router } from "express";
import createExtraContentController from "../controllers/extraContents/createExtraContent.controller";
import deleteExtraContentController from "../controllers/extraContents/deleteExtraContent.controller";
import listExtraContentsController from "../controllers/extraContents/listExtraContents.controller";
import updateExtraContentController from "../controllers/extraContents/updateExtraContent.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const extraContentRoutes = Router();

extraContentRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  createExtraContentController
);
extraContentRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  updateExtraContentController
);
extraContentRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  listExtraContentsController
);
extraContentRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  deleteExtraContentController
);

export default extraContentRoutes;
