import { Router } from "express";
import createTextController from "../controllers/texts/createText.controller";
import deleteTextController from "../controllers/texts/deleteText.controller";
import listTextsController from "../controllers/texts/listTexts.controller";
import updateTextController from "../controllers/texts/updateText.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const textRoutes = Router();

textRoutes.post("/:id", ensureAuthMiddleware, createTextController);
textRoutes.patch("/:id", ensureAuthMiddleware, updateTextController);
textRoutes.get("/:id", ensureAuthMiddleware, listTextsController);
textRoutes.delete("/:id", ensureAuthMiddleware, deleteTextController);

export default textRoutes;
