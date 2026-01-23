import { Router } from "express";
import { createUserHandler, getUsersHandler } from "../controllers/users.controller.ts";

const router = Router();

router.post("/", createUserHandler);
router.get("/", getUsersHandler);

export default router;
