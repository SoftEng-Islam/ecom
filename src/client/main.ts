import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.ts";
import { MotionPlugin } from "@vueuse/motion";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // Import the CSS or use your own!

import "./styles/vendor/tailwind.css";
import "./styles/main.sass";

import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";

import VueTippy from "vue-tippy";
// import 'tippy.js/themes/material.css' // optional for styling

import directives from "./directives/index.ts";

// Import the functions you need from the SDKs you need
import "./services/firebase";

const app = createApp(App);

// Register router, pinia, and plugins
app.use(router);
app.use(createPinia());

app.use(Toast, {
  // You can set your default options here
});
app.use(VueTippy, {
  directive: "tippy", // => v-tippy
  component: "tippy", // => <tippy/>
  componentSingleton: "tippy-singleton", // => <tippy-singleton/>
  defaultProps: {
    placement: "auto-end",
    allowHTML: true,
  },
});
app.use(PerfectScrollbarPlugin);
app.use(MotionPlugin);

// Register your custom directives
Object.entries(directives).forEach(([name, directive]) => {
  app.directive(name, directive);
});

// Mount the app
app.mount("#app");
