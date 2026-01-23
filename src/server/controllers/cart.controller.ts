import { Request, Response } from "express";
import * as cartService from "../services/cart.service.ts";

export const getCartHandler = async (req: Request, res: Response) => {
	const cart = await cartService.getCartItems(req.params.userId);
	if (cart === null) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	res.json(cart);
};

export const addToCartHandler = async (req: Request, res: Response) => {
	const productId = String(req.body.id);
	const cart = await cartService.addToCart(req.params.userId, productId);
	if (cart === null) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	res.json(cart);
};

export const removeFromCartHandler = async (req: Request, res: Response) => {
	const cart = await cartService.removeFromCart(req.params.userId, req.params.productID);
	if (cart === null) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	res.json(cart);
};
