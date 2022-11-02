import { Router } from "express"
import createUserController from "../controllers/createUser.controller"
import deleteUserController from "../controllers/deleteUser.controller"
import listUsersController from "../controllers/listUsers.controller"
import retrieveUserController from "../controllers/retrieveUser.controller"
import updateUserController from "../controllers/updateUser.controller"
import userProfileController from "../controllers/userProfile.controller"
import ensureAuth from "../middlewares/ensureAuth.middleware"
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware"

const router = Router()

router.post("", createUserController);
router.get("/profile", ensureAuth, userProfileController) // User Profile
router.get("/:id", ensureAuth, retrieveUserController) // Retrieve User
router.get("", ensureAuth, ensureIsAdm, listUsersController) // List Users
router.patch("/:id", ensureAuth, updateUserController);
router.delete("/:id", ensureAuth, deleteUserController);

export default router