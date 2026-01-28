// import views

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/HomeView.vue'),
        meta: { requiresAuth: false },

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/LoginView.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../pages/ProductsView.vue'),
    },
    {
        path: '/products/:productId',
        name: 'details',
        component: () => import('../pages/ProductDetailView.vue'),
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../pages/ShoppingCartView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../pages/CheckoutView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../pages/HelpChatView.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@client/pages/UserProfileView.vue'),
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('../pages/CategoriesView.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/NotFoundView.vue'),
    },
];
