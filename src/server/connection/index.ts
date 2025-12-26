import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING || "";

/**
 * Connects to the MongoDB database.
 * @throws Will throw an error if connection fails.
 */
export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(connectionString);
		console.log(`MongoDB Connected: ${connection.connection.host}`);
	} catch (error) {
		console.error(`Database connection error: ${error}`);
		throw error;
	}
};
