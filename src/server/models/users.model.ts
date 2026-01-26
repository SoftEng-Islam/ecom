import { Schema, model, Document } from "mongoose";
import { type IUser } from "../types/user.ts";

const usersSchema = new Schema<IUser>(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		age: { type: Number },
		password: { type: String, required: true },
		phone: { type: String },
		role: { type: String, default: "user" },
		address: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			zipCode: { type: String },
			country: { type: String },
		},
		cartItems: { type: [String], default: [] },
	},
	{ timestamps: true },
);

export const Users = model<IUser>("users", usersSchema);
