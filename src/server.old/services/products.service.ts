import { Products, IProduct } from "../models/products.model.ts";

export const createProduct = async (
	data: Pick<IProduct, "id" | "name" | "description" | "basePrice" | "imageUrl">,
) => {
	return Products.create(data);
};

export const getProducts = async (filters: {
	type?: string;
	name?: string;
	minPrice?: number;
	maxPrice?: number;
	rating?: number;
	ids?: string;
	sort?: string;
	limit?: number;
	skip?: number;
}) => {
	const query: any = {};

	if (filters.ids) {
		query.id = { $in: filters.ids.split(',') };
	}

	if (filters.type) {
		query.type = filters.type;
	}

	if (filters.name) {
		query.$or = [
			{ name: { $regex: filters.name, $options: 'i' } },
			{ type: { $regex: filters.name, $options: 'i' } },
			{ tags: { $in: [new RegExp(filters.name, 'i')] } }
		];
	}

	if (filters.minPrice || filters.maxPrice) {
		query.basePrice = {};
		if (filters.minPrice) query.basePrice.$gte = filters.minPrice;
		if (filters.maxPrice) query.basePrice.$lte = filters.maxPrice;
	}

	if (filters.rating) {
		query.averageRating = { $gte: filters.rating };
	}

	let mongooseQuery = Products.find(query);

	if (filters.sort === 'price_low') {
		mongooseQuery = mongooseQuery.sort({ basePrice: 1 });
	} else if (filters.sort === 'price_high') {
		mongooseQuery = mongooseQuery.sort({ basePrice: -1 });
	} else if (filters.sort === 'stars') {
		mongooseQuery = mongooseQuery.sort({ stars: -1 });
	}

	if (filters.skip) {
		mongooseQuery = mongooseQuery.skip(filters.skip);
	}

	if (filters.limit) {
		mongooseQuery = mongooseQuery.limit(filters.limit);
	}

	return mongooseQuery.lean();
};

export const getProduct = async (productId: string) => {
	return Products.findOne({ id: productId }).lean();
};

export const getDistinctTypes = async () => {
	return Products.distinct("type");
};
