import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface IOrder extends Document {
    userId: string;
    items: IOrderItem[];
    totalAmount: number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, index: true },
        items: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                imageUrl: { type: String },
            },
        ],
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "processing",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "paid", // Simulation: assuming paid for now
        },
    },
    { timestamps: true },
);

export const Orders = mongoose.model<IOrder>("Order", OrderSchema);
