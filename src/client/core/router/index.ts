import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: "/",
		// 	name: "home",
		// 	component: () => import("../../modules/home/HomeView.vue"),
		// },
		{
			path: "/",
			name: "todo",
			component: () => import("../../modules/todoo/views/TodoView.vue"),
		},
	],
	// linkActiveClass: '',
	// linkExactActiveClass: '',
});

export default router;
