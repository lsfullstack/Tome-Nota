import { Router } from "express";
import createSessionController from "../controllers/cretateSession.controller";

const router = Router()

router.post("", createSessionController)

export default router