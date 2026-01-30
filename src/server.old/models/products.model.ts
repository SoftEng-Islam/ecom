import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
	id: string;
	name: string;
	type: string;
	tags: string[];
	description: string;
	basePrice: number; // Base price in USD or your chosen currency
	currency: string; // e.g., 'USD', 'EUR'
	convertedPrice?: number; // Optional: calculated on the fly
	imageUrl: string;
	dueDate: Date;
	// New for other features
	taxRate?: number; // e.g., 0.08 for 8% tax
	vatRate?: number; // e.g., 0.20 for 20% VAT
	salePrice?: number; // Flash sale price
	saleStart?: Date;
	saleEnd?: Date;
	averageRating?: number;
	reviewCount?: number;
}

const productsSchema = new Schema<IProduct>(
	{
		id: {
			type: String,
			required: [true, "Product id Is Required"],
		},
		name: {
			type: String,
			required: [true, "Product name is Required"],
		},
		type: {
			type: String,
			required: [true, "Product Type is Required"],
		},
		tags: {
			type: [],
			required: [false, "Product Tags is Required"],
		},
		description: {
			type: String,
			required: [true, "Product description is Required"],
		},
		basePrice: {
			type: Number,
			required: [true, "Product basePrice is Required"],
			index: true,
		},
		currency: {
			type: String,
			default: "USD",
		},
		imageUrl: {
			type: String,
			required: [true, "Product imageUrl is Required"],
		},
		dueDate: {
			type: Date,
		},
		taxRate: {
			type: Number,
			default: 0,
		},
		vatRate: {
			type: Number,
			default: 0,
		},
		salePrice: {
			type: Number,
		},
		saleStart: {
			type: Date,
		},
		saleEnd: {
			type: Date,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		reviewCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	},
);

export const Products = model<IProduct>("products", productsSchema);
