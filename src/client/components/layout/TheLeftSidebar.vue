<script setup lang="ts">
// No logic for now, just UI
</script>

<template lang="pug">
aside(class="hidden lg:flex flex-col w-64 min-h-full bg-white/10 backdrop-blur-md border-r border-white/10 shadow-xl rounded-2xl p-6 gap-8 mt-6 sticky top-28")
	//- User Profile (placeholder)
	div(class="flex flex-col items-center gap-2 mb-6")
		img(src="" alt="User Avatar" class="w-16 h-16 rounded-full border-4 border-orange-400/30 shadow-md bg-white/30 mb-2")
		span(class="text-lg font-bold text-white") Guest
		span(class="text-xs text-zinc-400") Welcome!

	//- Navigation Links
	nav(class="flex flex-col gap-2 w-full")
		a(href="/dashboard" class="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:bg-orange-400/10 hover:text-orange-400 font-medium transition-all duration-200")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
				path(stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6")
			span Dashboard
		a(href="/orders" class="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:bg-orange-400/10 hover:text-orange-400 font-medium transition-all duration-200")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
				path(stroke-linecap="round" stroke-linejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6")
			span Orders
		a(href="/favorites" class="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:bg-orange-400/10 hover:text-orange-400 font-medium transition-all duration-200")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
				path(stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z")
			span Favorites
		a(href="/settings" class="flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:bg-orange-400/10 hover:text-orange-400 font-medium transition-all duration-200")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
				path(stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2")
			span Settings

	//- Help Section
	div(class="mt-auto flex flex-col gap-2")
		span(class="text-xs text-zinc-400 mb-1") Need help?
		a(href="/support" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-400/10 text-orange-400 font-semibold hover:bg-orange-400/20 transition-all text-xs")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4")
				path(stroke-linecap="round" stroke-linejoin="round" d="M8.25 15a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 013 0m-3 0v-3.75A2.25 2.25 0 0112 9.75a2.25 2.25 0 012.25 2.25V15m-6 0h6")
			span Contact Support
</template>
