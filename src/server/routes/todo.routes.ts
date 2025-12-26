import { Router } from "express";
import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	toggleTodo,
	updateTodo,
} from "../controllers/todo.controllers.ts";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.patch("/:id/toggle", toggleTodo);
router.delete("/:id", deleteTodo);

export default router;
