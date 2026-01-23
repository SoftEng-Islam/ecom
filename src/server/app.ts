import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import userRoutes from "./routes/users.routes.ts";
import productRoutes from "./routes/products.routes.ts";
import cartRoutes from "./routes/cart.routes.ts";

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "../../public/assets/")));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
