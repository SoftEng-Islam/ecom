import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.ts';
import { useAuthStore } from '../modules/auth/auth.store';

const url = new URL(import.meta.env.BASE_URL, window.location.origin);

const router = createRouter({
    history: createWebHistory(url.pathname),
    routes: routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return {
            left: 0,
            top: 0,
        };
    },
});

// Navigation guards
// router.beforeEach((to, from, next) => {
// 	const authStore = useAuthStore();
// 	// Check if route requires authentication
// 	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
// 		next({ name: "login", query: { redirect: to.fullPath } });
// 		return;
// 	}
// 	// Check if route is for guests only (login/register)
// 	if (to.meta.requiresGuest && authStore.isAuthenticated) {
// 		next({ name: "dashboard" });
// 		return;
// 	}
// 	next();
// });

export default router;
