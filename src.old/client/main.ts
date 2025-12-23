import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./core/router/index";
import App from "./App.vue";

import Toast, { PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
	// You can set your default options here
};

import "./core/styles/vendor/tailwind.css";
import "./core/styles/main.sass";

// import 'tippy.js/themes/material.css' // optional for styling

const app = createApp(App);

// Register router, pinia, and plugins
app.use(router);
app.use(createPinia());
app.use(Toast, options);

// Mount the app
app.mount("#app");
