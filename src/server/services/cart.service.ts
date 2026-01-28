import { Users } from "../models/users.model.ts";
import { Products } from "../models/products.model.ts";

export const getCartItems = async (userId: string) => {
	const user = await Users.findOne({
		$or: [{ id: userId }, { firebaseUid: userId }]
	}).lean();
	if (!user || !user.cartItems) return null;

	// Normalize cart items: some might be plain strings (product IDs) from legacy data
	const normalizedItems = user.cartItems.map(item => {
		if (typeof item === 'string') {
			return { productId: item, quantity: 1 };
		}
		return item;
	});

	// Fetch full product details for each item in the cart
	const productIds = normalizedItems.map(item => item.productId);
	const products = await Products.find({ id: { $in: productIds } }).lean();

	// Merge quantity and other info from cart with product details
	return normalizedItems.map(cartItem => {
		const product = products.find(p => p.id === cartItem.productId);
		return {
			...cartItem,
			product: product || null
		};
	});
};

export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
	console.log(`Adding to cart: User=${userId}, Product=${productId}, Qty=${quantity}`);
	const user = await Users.findOne({
		$or: [{ id: userId }, { firebaseUid: userId }]
	});
	if (!user) return null;

	// Ensure cartItems is initialized
	if (!user.cartItems) user.cartItems = [];

	// NORMALIZE: Convert any legacy string items to objects before processing
	// This prevents Mongoose validation errors ("productId is required")
	user.cartItems = user.cartItems.map(item => {
		if (typeof item === 'string') {
			return { productId: item, quantity: 1, addedAt: new Date() };
		}
		return item;
	});

	// Check if item already exists in cart
	const itemIndex = user.cartItems.findIndex(item => item.productId === productId);

	if (itemIndex > -1) {
		// Increment quantity
		user.cartItems[itemIndex].quantity = (user.cartItems[itemIndex].quantity || 0) + quantity;
	} else {
		// Add new item as a clean object
		user.cartItems.push({
			productId: String(productId),
			quantity: Number(quantity),
			addedAt: new Date()
		});
	}

	try {
		await user.save();
		return getCartItems(userId);
	} catch (error: any) {
		console.error("Mongoose Save Error:", error.errors || error);
		throw error;
	}
};

export const removeFromCart = async (userId: string, productId: string) => {
	const user = await Users.findOneAndUpdate(
		{ $or: [{ id: userId }, { firebaseUid: userId }] },
		{ $pull: { cartItems: { productId } } },
		{ new: true },
	).lean();

	if (!user) return null;
	return getCartItems(userId);
};
