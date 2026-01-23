import { Router } from "express";
import {
	createProductHandler,
	getProductsHandler,
	getProductHandler,
	getFewProductsHandler,
	getProductsByTypeHandler,
	getProductsByPriceHandler,
} from "../controllers/products.controller.ts";
const router = Router();

router.post("/", createProductHandler);
router.get("/", getProductsHandler);
router.get("/:productId", getProductHandler);
router.get("/type/:type", getProductsByTypeHandler);
router.get("/price/:price", getProductsByPriceHandler);
router.get("/few/:count", getFewProductsHandler);
export default router;
