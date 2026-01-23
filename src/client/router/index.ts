import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "products",
			component: () => import("../views/ProductsView.vue"),
			alias: "/products",
		},
		{
			path: "/products/:productId",
			name: "details",
			component: () => import("../views/ProductDetailView.vue"),
		},
		{
			path: "/cart",
			name: "cart",
			component: () => import("../views/ShoppingCartView.vue"),
		},
		{
			path: "/:pathMatch(.*)*",
			component: () => import("../views/NotFoundView.vue"),
		},
	],
	// linkActiveClass: '',
	// linkExactActiveClass: '',
});

export default router;
