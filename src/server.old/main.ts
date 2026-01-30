import "dotenv/config";

import { app } from "./app.ts";
import { connectDB } from "./config/database.ts";

import express from "express";
import ViteExpress from "vite-express";

// Constants
const PORT: number = Number(process.env.PORT) || 3000;

// Database Connection
const start = async () => {
	// Database Connection
	try {
		await connectDB();
	} catch (error) {
		console.error(`Failed to connect to Database: ${error}`);
		process.exit(1);
	}
};

// Server initialization
start();

// Start Server
ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening on port http://localhost:${PORT}...`),
);
