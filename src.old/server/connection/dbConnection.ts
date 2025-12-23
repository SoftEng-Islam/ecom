import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.CONNECTION_STRING || "";

export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(connectionString);
		console.log(`MongoDB connected: ${connection.connection.host}`);
	} catch (error) {
		console.error("Database connection error:", error);
		throw error;
	}
};
