import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING || "";

/**
 * Connects To The MongoDB
 * @throws will throw an error if connection fails.
 */
export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(connectionString as string);
		console.log(`MongoDB Connected: ${connection.connection.host}`);
		// connection.model("users", new mongoose.Schema()); // ['users']
		// const collection = connection.connection.collection("users");
		// const users = await collection.find({}).toArray();
		// console.log(users);
	} catch (error) {
		console.log(`Database Connection Error: ${error}`);

		// ?
		// throw error;

		// Always crash the app if DB connection fails (fail-fast).
		process.exit(1);
	}
};
