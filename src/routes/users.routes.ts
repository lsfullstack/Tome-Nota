import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import retrieveUserController from "../controllers/users/retrieveUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import userProfileController from "../controllers/users/userProfile.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureEmailAlreadyExistMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensurePropertiesExistsMiddleware from "../middlewares/ensurePropertiesExists.middleware";

const usersRoutes = Router();

usersRoutes.post("", ensurePropertiesExistsMiddleware, ensureEmailAlreadyExistMiddleware, createUserController);
usersRoutes.get("/profile", ensureAuthMiddleware, userProfileController);
usersRoutes.get("/:id", ensureAuthMiddleware, retrieveUserController);
usersRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);
usersRoutes.patch("/:id", ensureAuthMiddleware, updateUserController);
usersRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default usersRoutes;
