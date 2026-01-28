import { Router } from "express";
import {
	getCartHandler,
	addToCartHandler,
	removeFromCartHandler,
} from "../controllers/cart.controller.ts";

const router = Router();

router.get("/", getCartHandler);
router.post("/", addToCartHandler);
router.delete("/:productID", removeFromCartHandler);

export default router;
