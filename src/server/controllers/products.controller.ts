import { Request, Response } from "express";
import * as productsService from "../services/products.service.ts";

export const createProductHandler = async (req: Request, res: Response) => {
	const product = await productsService.createProduct(req.body);
	res.status(201).json(product);
};

export const getProductsHandler = async (req: Request, res: Response) => {
	const { type, name, minPrice, maxPrice, rating, ids, sort, limit, skip } = req.query;
	const products = await productsService.getProducts({
		type: type as string,
		name: name as string,
		minPrice: minPrice ? Number(minPrice) : undefined,
		maxPrice: maxPrice ? Number(maxPrice) : undefined,
		rating: rating ? Number(rating) : undefined,
		ids: ids as string,
		sort: sort as string,
		limit: limit ? Number(limit) : 20,
		skip: skip ? Number(skip) : 0
	});
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

export const getCategoriesHandler = async (_req: Request, res: Response) => {
	const categories = await productsService.getDistinctTypes();
	res.json(categories);
};
