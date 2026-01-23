<script setup lang="ts">
// No additional logic for now
</script>

<template lang="pug">
nav(class="w-full left-0 bg-white/20 backdrop-blur-xl shadow-xl border-b border-white/10")
	div(class="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-20")
		//- Navigation Links
		div(class="hidden md:flex items-center gap-6")
			a(href="/trending" class="text-white/80 hover:text-orange-400 font-semibold text-base transition-colors duration-200 px-3 py-2 rounded-xl hover:bg-orange-400/10") Trending
			a(href="/today" class="text-white/80 hover:text-orange-400 font-semibold text-base transition-colors duration-200 px-3 py-2 rounded-xl hover:bg-orange-400/10") This Day
			a(href="/categories" class="text-white/80 hover:text-orange-400 font-semibold text-base transition-colors duration-200 px-3 py-2 rounded-xl hover:bg-orange-400/10") Categories

		//- User Actions
		div(class="flex items-center gap-3")
			button(type="button" class="p-2 rounded-full bg-white/10 hover:bg-orange-400/20 text-white hover:text-orange-400 transition-all duration-200 shadow-md")
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
					path(stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.6-10.6 7.5 7.5 0 01-10.6 10.6z")
			button(type="button" class="p-2 rounded-full bg-white/10 hover:bg-orange-400/20 text-white hover:text-orange-400 transition-all duration-200 shadow-md")
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
					path(stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.9a1 1 0 00.9-1.5L17 13M7 13l1.35-2.7M17 13l-1.35-2.7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z")
			button(type="button" class="p-2 rounded-full bg-white/10 hover:bg-orange-400/20 text-white hover:text-orange-400 transition-all duration-200 shadow-md")
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
					path(stroke-linecap="round" stroke-linejoin="round" d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm0 0c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5m9 0c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5m9 0v6.75a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V9")

		//- Mobile Menu Button
		div(class="md:hidden flex items-center")
			button(type="button" class="p-2 rounded-full bg-white/10 hover:bg-orange-400/20 text-white hover:text-orange-400 transition-all duration-200 shadow-md")
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7")
					path(stroke-linecap="round" stroke-linejoin="round" d="M4.5 6h15M4.5 12h15m-7.5 6h7.5")
</template>

<style scoped lang="sass">
nav
	background: rgba(255,255,255,0.2)
	backdrop-filter: blur(16px)
	box-shadow: 0 8px 24px rgba(0,0,0,0.12)
	border-bottom: 1px solid rgba(255,255,255,0.1)
</style>
