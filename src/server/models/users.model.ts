import { Schema, model, Document } from "mongoose";
export interface IUsers extends Document {
	id: string;
	name: string;
	email: string;
	age: number;
	password: string;
	phone?: string;
	role: string;
	address?: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
	cartItems: string[];
}
const usersSchema = new Schema<IUsers>(
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

export const Users = model<IUsers>("users", usersSchema);
