import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import vuePugPlugin from "vite-plugin-pug";
import viteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";

// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";
// dotenv.config();
// const port = process.env.PORT || 3000;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	// base: "",
	server: {
		watch: {
			// port: port,
			open: true,
			usePolling: true,
			interval: 300,
			ignored: ["**/mongodb-data/**"],
		},
	},
	plugins: [
		viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			mozjpeg: {
				quality: 20,
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4,
			},
			svgo: {
				plugins: [
					{
						name: "removeViewBox",
					},
					{
						name: "removeEmptyAttrs",
						active: false,
					},
				],
			},
		}),
		tailwindcss(),
		vue({
			template: {
				preprocessOptions: {
					// 'preprocessOptions' is passed through to the pug compiler
					plugins: [vuePugPlugin],
				},
			},
		}),
		visualizer({ open: true }), // generates a graph of bundle content
		vueDevTools(),
	],
	css: {
		devSourcemap: mode === "development",
	},
	resolve: {
		alias: {
			// "@": fileURLToPath(new URL("./", import.meta.url)),
			// client: fileURLToPath(new URL("./src/client/", import.meta.url)),
			// server: fileURLToPath(new URL("./src/server/", import.meta.url)),
		},
	},
}));
