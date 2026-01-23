<script setup lang="ts">
// No logic for now, just UI
</script>

<template lang="pug">
aside(class="hidden xl:flex flex-col w-80 min-h-full bg-white/10 backdrop-blur-md border-l border-white/10 shadow-xl rounded-2xl p-6 gap-8 mt-6 sticky top-28")
	//- Announcements
	div(class="mb-8")
		h3(class="text-lg font-bold text-orange-400 mb-2") Announcements
		ul(class="space-y-2 text-sm text-zinc-200")
			li New features coming soon!
			li Check out our summer sale.
			li Free shipping for orders over $50.

	//- Quick Actions
	div(class="mb-8")
		h3(class="text-lg font-bold text-orange-400 mb-2") Quick Actions
		div(class="flex flex-col gap-3")
			button(class="w-full px-4 py-2 rounded-lg bg-orange-400/20 text-orange-400 font-semibold hover:bg-orange-400 hover:text-white transition-all") Add Product
			button(class="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white font-semibold hover:bg-orange-400/80 hover:text-white transition-all") View Cart
			button(class="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white font-semibold hover:bg-orange-400/80 hover:text-white transition-all") Track Order

	//- Suggestions
	div
		h3(class="text-lg font-bold text-orange-400 mb-2") Suggestions
		ul(class="space-y-2 text-sm text-zinc-200")
			li Try our new vegan options!
			li Rate your last purchase.
			li Invite friends and earn rewards.
</template>
