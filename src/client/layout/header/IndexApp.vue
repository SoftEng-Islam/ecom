<script setup lang="ts">
import TheNavbar from "./TheNavbar.vue";

</script>
<template lang="pug">
header(class="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl")
	div(class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6")
		router-link(to="/" class="flex items-center gap-2 group")
			div(class="size-8 rounded-lg bg-linear-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300")
				span(class="text-white font-bold text-lg font-outfit") H
			span(class="text-xl font-bold bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent font-outfit tracking-tight") HumHum

		nav
			ul(class="flex items-center gap-1")
				li
					router-link(
						to="/"
						class="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
						active-class="!text-orange-400 bg-orange-500/10"
					) Home
				li
					router-link(
						to="/cart"
						class="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-2"
						active-class="!text-orange-400 bg-orange-500/10"
					) Cart
the-navbar
</template>
<style scoped lang="css">
.font-outfit {
	font-family: 'Outfit', sans-serif;
}
</style>
