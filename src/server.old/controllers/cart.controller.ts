import { Request, Response } from "express";
import * as cartService from "../services/cart.service.ts";

// Extend Request type locally or use 'any' if types aren't fully set up for req.user
interface AuthRequest extends Request {
	user?: {
		uid: string;
		email?: string;
	};
}

export const getCartHandler = async (req: AuthRequest, res: Response) => {
	const userId = req.user?.uid;
	if (!userId) return res.status(401).json({ message: "Unauthorized" });

	const cart = await cartService.getCartItems(userId);
	if (cart === null) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	res.json(cart);
};

export const addToCartHandler = async (req: AuthRequest, res: Response) => {
	const userId = req.user?.uid;
	if (!userId) return res.status(401).json({ message: "Unauthorized" });

	const productId = req.body.productId || req.body.id;
	const quantity = Number(req.body.quantity) || 1;

	if (!productId) {
		return res.status(400).json({ message: "Product ID is required" });
	}

	try {
		const cart = await cartService.addToCart(userId, String(productId), quantity);
		if (cart === null) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.json(cart);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const removeFromCartHandler = async (req: AuthRequest, res: Response) => {
	const userId = req.user?.uid;
	if (!userId) return res.status(401).json({ message: "Unauthorized" });

	const cart = await cartService.removeFromCart(userId, req.params.productID);
	if (cart === null) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	res.json(cart);
};
