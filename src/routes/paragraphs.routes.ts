import { Router } from "express";
import createParagraphController from "../controllers/paragraphs/createParagraph.controller";
import deleteParagraphController from "../controllers/paragraphs/deleteParagraph.controller";
import listParagraphsController from "../controllers/paragraphs/listTParagraphs.controller";
import updateParagraphController from "../controllers/paragraphs/updateParagraphs.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const paragraphsRoutes = Router();

paragraphsRoutes.post("/:id", ensureAuthMiddleware, createParagraphController);
paragraphsRoutes.patch("/:id", ensureAuthMiddleware, updateParagraphController);
paragraphsRoutes.get("/:id", ensureAuthMiddleware, listParagraphsController);
paragraphsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  deleteParagraphController
);

export default paragraphsRoutes;
