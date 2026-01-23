import { Request, Response } from "express";
import * as productsService from "../services/products.service.ts";

export const createProductHandler = async (req: Request, res: Response) => {
	const product = await productsService.createProduct(req.body);
	res.status(201).json(product);
};

export const getProductsHandler = async (_req: Request, res: Response) => {
	const products = await productsService.getProducts();
	res.json(products);
};

export const getProductHandler = async (req: Request, res: Response) => {
	const product = await productsService.getProduct(req.params.productId);
	if (!product) {
		res.status(404).json({ message: "Product not found" });
		return;
	}
	res.json(product);
};

export const getFewProductsHandler = async (req: Request, res: Response) => {
	const products = await productsService.getFewProducts(Number(req.params.count));
	if (!products) {
		res.status(404).json({ message: "Products not found" });
		return;
	}
	res.json(products);
};

export const getProductsByTypeHandler = async (req: Request, res: Response) => {
	const products = await productsService.getProductsByType(req.params.type);
	if (!products) {
		res.status(404).json({ message: "Products of that type not found" });
		return;
	}
	res.json(products);
};

export const getProductsByPriceHandler = async (req: Request, res: Response) => {
	const price: "low" | "high" = req.params.price as "low" | "high";
	const products = await productsService.getProductsByPrice(price);
	res.json(products);
};
