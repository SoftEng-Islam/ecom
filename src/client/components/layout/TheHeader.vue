<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import axios from 'axios';
import { type User } from "firebase/auth";
import TheNavbar from './TheNavbar.vue';
import { useCartStore } from '@client/store/cart.ts';
import type { IProduct } from "@shared/types/index.d.ts";

/**
 * Main application header component.
 * Features: Modern Glassmorphism, Search with suggestions, Auth integration, Cart count.
 * Follows Rules.md: Pug template, Sass styles, Glassmorphism design.
 */

const props = defineProps<{
	user: User | null;
}>();

const router = useRouter();
const isLoggedIn = props.user;
const avatarUrl = ref("");
const userName = ref("");
const cartStore = useCartStore();
const searchQuery = ref('');
const suggestions = ref<IProduct[]>([]);
const isMenuOpen = ref(false);
const isSearchFocused = ref(false);
const currentPath = ref('');
const isScrolled = ref(false);
const isUserMenuOpen = ref(false);

const navItems = ref([
	{ name: "Home", path: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
	{ name: "Products", path: "/products", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" }
]);

const userMenuItems = ref([
	{ name: "My Profile", path: "/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
	{ name: "Orders", path: "/orders", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }
]);

const cartCount = computed(() => cartStore.items.length);

// Fetch search suggestions
watch(searchQuery, async (newQuery) => {
	if (newQuery.length < 2) {
		suggestions.value = [];
		return;
	}
	try {
		const response = await axios.get(`/api/products?name=${encodeURIComponent(newQuery)}&limit=5`);
		suggestions.value = response.data;
	} catch (err) {
		console.error('Search suggestion error:', err);
	}
});

const handleSearch = (e: Event) => {
	e.preventDefault();
	if (searchQuery.value.trim()) {
		router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`);
		searchQuery.value = '';
		suggestions.value = [];
		isSearchFocused.value = false;
	}
};

const navigateToProduct = (id: string) => {
	router.push(`/products/${id}`);
	searchQuery.value = '';
	suggestions.value = [];
	isSearchFocused.value = false;
};

const handleScroll = () => {
	isScrolled.value = window.scrollY > 10;
};

const closeMenus = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	if (!target.closest('.user-menu') && !target.closest('.user-avatar')) {
		isUserMenuOpen.value = false;
	}
	if (!target.closest('.search-container') && isSearchFocused.value) {
		isSearchFocused.value = false;
	}
};

const logout = async () => {
	const auth = getAuth();
	try {
		await signOut(auth);
		isUserMenuOpen.value = false;
		router.push('/');
	} catch (error) {
		console.error('Error signing out:', error);
	}
};

const handleEmailSignIn = async () => {
	const auth = getAuth();
	if (isSignInWithEmailLink(auth, window.location.href)) {
		const email = window.localStorage.getItem('emailForSignIn');
		if (email) {
			try {
				await signInWithEmailLink(auth, email, window.location.href);
				window.localStorage.removeItem('emailForSignIn');
				router.push('/');
			} catch (error) {
				console.error('Error signing in with email link:', error);
			}
		}
	}
};

watch(() => router.currentRoute.value.path, (newPath) => {
	currentPath.value = newPath;
	isMenuOpen.value = false;
	isUserMenuOpen.value = false;
	isSearchFocused.value = false;
});

onMounted(() => {
	handleEmailSignIn();
	window.addEventListener('scroll', handleScroll);
	document.addEventListener('click', closeMenus);
	currentPath.value = router.currentRoute.value.path;
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
	document.removeEventListener('click', closeMenus);
});
</script>

<template lang="pug">
header(:class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b', isScrolled || isSearchFocused ? 'bg-zinc-900/80 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent']")
	div(class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")
		div(class="flex justify-between items-center h-16")
			//- Logo Section
			div(class="flex items-center")
				router-link(to="/" class="group flex items-center space-x-3" @click="isMenuOpen = false")
					div(class="h-10 w-10 rounded-xl bg-linear-to-tr from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300")
						span(class="text-white font-extrabold text-xl font-outfit") H
					span(class="text-2xl font-black bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent font-outfit tracking-tighter hidden sm:block") HumHum

			//- Desktop Navigation
			nav(class="hidden md:flex items-center space-x-2")
				router-link(v-for="item in navItems" :key="item.name" :to="item.path" :class="['px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2', currentPath === item.path ? 'bg-orange-500/10 text-orange-400' : 'text-zinc-400 hover:text-white hover:bg-white/5']")
					svg(class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24")
						path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon")
					span {{ item.name }}

			//- Right Controls
			div(class="flex items-center space-x-4")
				//- Search Container
				div(class="relative search-container")
					button(@click="isSearchFocused = !isSearchFocused" :class="['p-2.5 rounded-xl transition-all duration-300', isSearchFocused ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10']")
						svg(class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24")
							path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")

					//- Search Dropdown
					transition(enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-4 opacity-0 scale-95" enter-to-class="translate-y-0 opacity-100 scale-100" leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100 scale-100" leave-to-class="translate-y-4 opacity-0 scale-95")
						div(v-if="isSearchFocused" class="absolute right-0 mt-4 w-80 md:w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl")
							form(@submit="handleSearch" class="flex items-center p-4 bg-white/5")
								input(v-model="searchQuery" type="text" placeholder="What are you looking for?" class="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-500 px-2" v-focus)
								button(type="submit" class="p-2 text-zinc-400 hover:text-orange-500 transition-colors")
									svg(class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24")
										path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")

							//- Suggestions List
							div(v-if="suggestions.length > 0" class="py-2 border-t border-white/5")
								div(v-for="p in suggestions" :key="p.id" @click="navigateToProduct(p.id)" class="flex items-center gap-4 px-4 py-3 hover:bg-white/5 cursor-pointer group transition-colors")
									div(class="h-12 w-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-white/5")
										img(:src="p.imageUrl" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500")
									div(class="flex-1 min-w-0")
										p(class="text-sm font-semibold text-white truncate") {{ p.name }}
										p(class="text-xs text-orange-400 font-bold") ${{ p.salePrice || p.basePrice }}
								button(@click="handleSearch" class="w-full py-4 text-[10px] text-zinc-500 hover:text-orange-500 hover:bg-white/5 transition-all font-black tracking-[0.2em] uppercase border-t border-white/5") View all results
							div(v-else-if="searchQuery.length > 1" class="p-10 text-center")
								p(class="text-zinc-500 text-sm") No results for "{{ searchQuery }}"

				//- Cart Button
				router-link(to="/cart" class="relative p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300")
					svg(class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24")
						path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z")
					span(v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-lg h-5 w-5 flex items-center justify-center shadow-lg shadow-orange-500/40") {{ cartCount }}

				//- Auth/User Menu
				div(class="relative user-menu")
					button(@click.stop="isUserMenuOpen = !isUserMenuOpen" class="flex items-center p-0.5 rounded-full border-2 border-transparent hover:border-orange-500/50 transition-all duration-300")
						div(v-if="isLoggedIn" class="user-avatar h-8 w-8 rounded-full overflow-hidden border border-white/10")
							img(:src="avatarUrl || 'https://ui-avatars.com/api/?name=' + userName" class="h-full w-full object-cover")
						div(v-else class="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors")
							svg(class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24")
								path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z")

					//- User Dropdown
					transition(enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-4 opacity-0 scale-95" enter-to-class="translate-y-0 opacity-100 scale-100" leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100 scale-100" leave-to-class="translate-y-4 opacity-0 scale-95")
						div(v-if="isUserMenuOpen" class="absolute right-0 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl")
							div(v-if="isLoggedIn && props.user" class="px-5 py-4 border-b border-white/5 bg-white/5")
								p(class="text-sm font-bold text-white truncate") {{ userName || props.user.email?.split('@')[0] }}
								p(class="text-[10px] text-zinc-500 truncate mt-0.5") {{ props.user.email }}

							div(class="p-2")
								template(v-if="isLoggedIn")
									router-link(v-for="item in userMenuItems" :key="item.name" :to="item.path" class="flex items-center px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all")
										svg(class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24")
											path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon")
										| {{ item.name }}
									button(@click="logout" class="w-full flex items-center px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all mt-1")
										svg(class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24")
											path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1")
										| Sign out
								template(v-else)
									router-link(to="/login" class="flex items-center px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all") Sign in
									router-link(to="/register" class="flex items-center px-4 py-2.5 text-sm text-orange-400 hover:bg-orange-400/10 rounded-xl transition-all mt-1") Create account

				//- Mobile Menu Toggle
				button(@click="isMenuOpen = !isMenuOpen" class="md:hidden p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-all")
					svg(v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24")
						path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7")
					svg(v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24")
						path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12")

	//- Mobile Side Menu
	transition(enter-active-class="transition duration-300 ease-out" enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="translate-x-0" leave-to-class="-translate-x-full")
		div(v-if="isMenuOpen" class="fixed inset-0 z-40 md:hidden h-screen bg-zinc-950/95 backdrop-blur-xl pt-20 px-6")
			nav(class="flex flex-col space-y-2")
				router-link(v-for="item in navItems" :key="'mob-' + item.name" :to="item.path" class="flex items-center space-x-4 p-4 rounded-2xl text-lg font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all" @click="isMenuOpen = false")
					svg(class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24")
						path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon")
					span {{ item.name }}

			div(class="mt-10 pt-10 border-t border-white/5 space-y-6")
				div(v-if="isLoggedIn" class="flex items-center space-x-4")
					img(:src="avatarUrl || 'https://ui-avatars.com/api/?name=' + userName" class="h-12 w-12 rounded-2xl border border-white/10")
					div
						p(class="text-white font-bold") {{ userName || props.user?.email?.split('@')[0] }}
						p(class="text-xs text-zinc-500") {{ props.user?.email }}
				div(v-else class="grid grid-cols-2 gap-4")
					router-link(to="/login" class="flex items-center justify-center p-4 rounded-2xl bg-white/5 text-white font-bold text-center") Sign in
					router-link(to="/register" class="flex items-center justify-center p-4 rounded-2xl bg-orange-500 text-white font-bold text-center shadow-lg shadow-orange-500/20") Sign up

//- Sticky Placeholder
div(class="h-16")
the-navbar
</template>

<style scoped lang="sass">
.font-outfit
	font-family: 'Outfit', sans-serif

header
	will-change: transform, background-color, border-color

/* Custom focusing for the search bar input */
input:focus
	outline: none

/* Hide scrollbar for suggestions if needed */
.suggestions-scroll
	scrollbar-width: thin
	scrollbar-color: rgba(255, 255, 255, 0.1) transparent
</style>
