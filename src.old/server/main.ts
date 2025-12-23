// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";
// dotenv.config();

import { connectDB } from "./connection/dbConnection.ts";
connectDB();

import express from "express";
import ViteExpress from "vite-express";

import helloRouter from "./routes/helloRoute.ts";

import contactRouter from "./routes/contactRoute.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { connect } from "http2";

// Import dotenv
// import dotenv from "dotenv";
// dotenv.config({ path: "../../.env" });

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use("/", helloRouter);
app.use("/api/contacts", contactRouter);
app.use(errorHandler);

ViteExpress.listen(app, port, () =>
	console.log(`Server is listening on port http://localhost:${port}...`),
);
