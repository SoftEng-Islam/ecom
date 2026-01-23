import { Users } from "../models/users.model.ts";
import { Products } from "../models/products.model.ts";

export const getCartItems = async (userId: string) => {
	const user = await Users.findOne({ id: userId }).lean();
	if (!user) return null;

	const productIds = user.cartItems.map((id) => Number(id));
	return Products.find({ id: { $in: productIds } }).lean();
};

export const addToCart = async (userId: string, productId: string) => {
	const user = await Users.findOneAndUpdate(
		{ id: userId },
		{ $addToSet: { cartItems: productId } },
		{ new: true },
	).lean();

	if (!user) return null;

	const productIds = user.cartItems.map((id) => Number(id));
	return Products.find({ id: { $in: productIds } }).lean();
};

export const removeFromCart = async (userId: string, productId: string) => {
	const user = await Users.findOneAndUpdate(
		{ id: userId },
		{ $pull: { cartItems: productId } },
		{ new: true },
	).lean();

	if (!user) return null;

	const productIds = user.cartItems.map((id) => Number(id));
	return Products.find({ id: { $in: productIds } }).lean();
};
