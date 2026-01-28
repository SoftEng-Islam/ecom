import { Router } from "express";
import {
	createProductHandler,
	getProductsHandler,
	getProductHandler,
	getCategoriesHandler,
} from "../controllers/products.controller.ts";
const router = Router();

router.post("/", createProductHandler);
router.get("/", getProductsHandler);
router.get("/categories", getCategoriesHandler);
router.get("/:productId", getProductHandler);
export default router;
