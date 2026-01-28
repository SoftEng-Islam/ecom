<script setup lang="ts">
import { ref } from 'vue'

/**
 * Navbar component for product categories and service highlights.
 * Follows Glassmorphism design principles and Tailwind v4.
 */

const categories = ref([
	{ name: 'All Products', path: '/products' },
	{ name: 'Trending', path: '/trending' },
	{ name: 'Electronics', path: '/categories/electronics' },
	{ name: 'Fashion', path: '/categories/fashion' },
	{ name: 'Home & Decor', path: '/categories/home' },
	{ name: 'Sale', path: '/sale', highlight: true }
])

const services = ref([
	{ name: 'Free Shipping', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
	{ name: '24/7 Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
])
</script>

<template lang="pug">
nav(class="w-full bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-16 z-40")
	div(class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12")
		//- Categories Section
		div(class="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth")
			router-link(v-for="cat in categories" :key="cat.name" :to="cat.path" :class="['px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap', cat.highlight ? 'text-orange-500 bg-orange-500/10 hover:bg-orange-500/20' : 'text-zinc-400 hover:text-white hover:bg-white/5']") {{ cat.name }}

		//- Services Section (Hidden on small screens)
		div(class="hidden md:flex items-center gap-6")
			div(v-for="service in services" :key="service.name" class="flex items-center gap-2 text-zinc-400 group cursor-default")
				svg(class="w-4 h-4 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24")
					path(stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="service.icon")
				span(class="text-xs font-medium tracking-wide group-hover:text-zinc-200 transition-colors uppercase") {{ service.name }}
</template>

<style scoped lang="sass">
.no-scrollbar
	-ms-overflow-style: none
	scrollbar-width: none
	&::-webkit-scrollbar
		display: none

nav
	background: rgba(255, 255, 255, 0.03)
	backdrop-filter: blur(12px)
	border-bottom: 1px solid rgba(255, 255, 255, 0.08)
</style>
