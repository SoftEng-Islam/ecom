import { Router } from "express";
import { createOrderHandler, getUserOrdersHandler } from "../controllers/orders.controller.ts";

const router = Router();

router.post("/", createOrderHandler);
router.get("/", getUserOrdersHandler);

export default router;
