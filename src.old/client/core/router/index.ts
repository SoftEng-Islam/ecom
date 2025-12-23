import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../../modules/home/HomeView.vue"),
		},
		{
			path: "/contacts",
			name: "ContactsPage",
			component: () => import("../../modules/contacts/views/ContactView.vue"),
		},
		{
			path: "/contact-list",
			name: "contactList",
			component: () => import("../../modules/contacts/components/ContactList.vue"),
		},
		{
			path: "/create-contact",
			name: "AddContact",
			component: () => import("../../modules/contacts/components/AddContact.vue"),
		},
		{
			path: "/contacts/:id",
			name: "EditContact",
			component: () => import("../../modules/contacts/components/EditContact.vue"),
		},
	],
	// linkActiveClass: '',
	// linkExactActiveClass: '',
});

export default router;
