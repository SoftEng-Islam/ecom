import { Products, IProduct } from "../models/products.model.ts";

export const createProduct = async (
	data: Pick<IProduct, "id" | "name" | "description" | "basePrice" | "imageUrl">,
) => {
	return Products.create(data);
};

export const getProducts = async () => {
	return Products.find().lean();
};

export const getProduct = async (productId: string) => {
	return Products.findOne({ id: productId }).lean();
};

export const getFewProducts = async (count: number) => {
	return Products.find().limit(count);
};

export const getProductsByType = async (type: string) => {
	return Products.find({ type: type });
};

export const getProductsByPrice = async (price: "low" | "high") => {
	console.log(price);
	if (price === "low") {
		// get products from low price to high
		return Products.find().limit(5).sort({ basePrice: 1 }).lean();
	} else {
		// get products from high price to low
		return Products.find().limit(5).sort({ basePrice: -1 }).lean();
	}
};
