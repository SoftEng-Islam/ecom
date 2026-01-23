import { Router } from "express";
import {
	getCartHandler,
	addToCartHandler,
	removeFromCartHandler,
} from "../controllers/cart.controller.ts";

const router = Router();

router.get("/:userId/cart", getCartHandler);
router.post("/:userId/cart", addToCartHandler);
router.delete("/:userId/cart/:productID", removeFromCartHandler);

export default router;
