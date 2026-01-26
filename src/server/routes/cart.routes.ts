import { Router } from "express";
import {
	getCartHandler,
	addToCartHandler,
	removeFromCartHandler,
} from "../controllers/cart.controller.ts";

const router = Router();

router.get("/:userId", getCartHandler);
router.post("/:userId", addToCartHandler);
router.delete("/:userId/:productID", removeFromCartHandler);

export default router;
