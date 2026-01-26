import { Users } from "../models/users.model.ts";
import { Products } from "../models/products.model.ts";

export const getCartItems = async (userId: string) => {
	console.log(userId);
	const user = await Users.findOne({ id: userId }).lean();
	console.log(user);
	if (!user) return null;
	return Products.find({ id: { $in: user?.cartItems } }).lean();
};

export const addToCart = async (userId: string, productId: string) => {
	const existingUser = await Users.findOne({ id: userId });
	if (!existingUser) {
		console.log(`There is no User to items to his cart`);
		await Users.insertOne({ id: userId, cartItems: [] });
		console.log(`New User added with Id ${userId}`);
		return { message: "No user" };
	} else {
		console.log(`There is User`);
		const user = await Users.findOneAndUpdate(
			{ id: userId },
			{ $addToSet: { cartItems: productId } },
			{ new: true },
		).lean();

		if (!user) return null;
		return Products.find({ id: { $in: user?.cartItems } }).lean();
	}
};

export const removeFromCart = async (userId: string, productId: string) => {
	const user = await Users.findOneAndUpdate(
		{ id: userId },
		{ $pull: { cartItems: productId } },
		{ new: true },
	).lean();

	if (!user) return null;
	// const productIds: string[] = user?.cartItems.map((id) => id);
	return Products.find({ id: { $in: user?.cartItems } }).lean();
};
