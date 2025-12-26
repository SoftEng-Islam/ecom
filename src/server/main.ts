import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";

import { connectDB } from "./connection/index.ts";
import toDoRouter from "./routes/todo.routes.ts";

// Constants
const PORT: number = Number(process.env.PORT) || 3000;

// Initialize App
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/todos", toDoRouter);

// Database Connection
try {
	await connectDB();
} catch (error) {
	console.error("Failed to connect to database:", error);
	process.exit(1);
}

// Start Server
ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening on port http://localhost:${PORT}...`),
);
