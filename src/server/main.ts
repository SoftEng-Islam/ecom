import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";

// Get the Port from .env file
dotenv.config();
const port: string | number = process.env.PORT || 3000;

// The MongoDB Connection
import { connectDB } from "./connection/index.ts";
connectDB();

const app = express();
app.use(express.json());

ViteExpress.listen(app, port as number, () =>
	console.log(`Server is listening on port http://localhost:${port}...`),
);
