// import views

export default [
  {
    path: "/",
    name: "Home",
    redirect: "/products",
    beforeEnter(to, from, next) {
      console.log("/ Before Enter");
      console.log(to, from);
      next();
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/products",
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
    meta: { requiresAuth: true },
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../views/HelpChatView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@client/views/UserProfileView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/CategoriesView.vue"),
  },
  {
    // path: "/deals",
    // name: "deals",
    // component: () => import("../views/DealsView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    // path: "/orders",
    // name: "orders",
    // component: () => import("../views/OrdersView.vue"),
    // meta: { requiresAuth: true },
  },
  {
    // path: "/wishlist",
    // name: "wishlist",
    // component: () => import("../views/WishlistView.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
  },
];
