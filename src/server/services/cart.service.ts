import { Users } from "../models/users.model.ts";
import { Products } from "../models/products.model.ts";
import type { ICartItem } from "../types/user.ts";

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const itemObj = item as any;
		if (itemObj && typeof itemObj === 'object' && typeof itemObj.productId === 'string') {
			return itemObj as unknown as ICartItem;
		}
		return null;
	}).filter((item): item is ICartItem => item !== null);

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

	// NORMALIZE: Convert any legacy string items or incomplete objects to valid items
	// This prevents Mongoose validation errors ("productId is required")
	const normalizedItems = user.cartItems.map(item => {
		// Handle legacy string items
		if (typeof item === 'string') {
			return { productId: item, quantity: 1, addedAt: new Date() };
		}
		// Handle objects (could be Mongoose subdocuments or plain objects)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const itemObj = item as any;
		if (itemObj && typeof itemObj === 'object') {
			// If it's an object but lacks productId, it might be a corrupted subdocument
			if (typeof itemObj.productId !== 'string') {
				console.warn(`Found invalid cart item for user ${userId}:`, itemObj);
				return null;
			}
			return itemObj as unknown as ICartItem;
		}
		return null;
	}).filter((item): item is ICartItem => item !== null);

	// Re-assign to the user document
	user.cartItems = normalizedItems;

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
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mongooseError = error as any;
		console.error("Mongoose Save Error:", mongooseError.errors || mongooseError);
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
