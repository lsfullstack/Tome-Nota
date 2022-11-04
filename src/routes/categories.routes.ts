import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import retrieveCategoryController from "../controllers/categories/retrieveCategory.controller";
import updateCategoryController from "../controllers/categories/updateCategory.controller";
import deleteCategoryController from "../controllers/categories/deleteCategory.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post("", ensureAuthMiddleware, createCategoryController);
categoriesRoutes.get("", ensureAuthMiddleware, listCategoriesController);
categoriesRoutes.get("/:id", ensureAuthMiddleware, retrieveCategoryController);
categoriesRoutes.patch("/:id", ensureAuthMiddleware, updateCategoryController);
categoriesRoutes.delete("/:id", ensureAuthMiddleware, deleteCategoryController);

export default categoriesRoutes;