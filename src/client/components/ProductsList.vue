<script setup lang="ts">
const props = defineProps<{
	products: [];
}>();
</script>

<template lang="pug">
div(class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full")
	div(
		class="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
		v-for="product in products"
		:key="product.id"
	)
		//- Image Container
		router-link(:to="'/products/' + product.id" class="w-full")
			div(class="aspect-square w-full overflow-hidden bg-zinc-800")
				img(v-if="product.imageUrl"
					:src="product.imageUrl"
					class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
					loading="lazy"
				)
				div(v-else)
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="37.07" height="36" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 198"><path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path><path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path><path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path></svg>

			//- Overlay Actions
			div(class="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4")
				router-link(:to="'/products/' + product.id" class="w-full")
					button(type="button" class="w-full py-2.5 rounded-xl bg-white text-zinc-950 font-semibold cursor-pointer hover:bg-orange-50 text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300") View Details

		//- Content
		div(class="flex flex-col gap-2 p-5")
			div(class="flex justify-between items-start gap-4")
				h3(class="text-lg font-medium text-white line-clamp-1") {{product.name}}
				span(class="shrink-0 rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-orange-400 border border-white/5") ${{product.basePrice}}

			p(class="text-sm text-zinc-400 line-clamp-2") {{product.description || 'Premium quality product.'}}
</template>
