<script setup lang="ts">
const props = defineProps<{
	products: [];
	viewType?: string;
}>();

const defaultImage = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'>
  <rect width='300' height='200' fill='#e5e7eb'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='20'>No Image</text>
</svg>`;
</script>

<template lang="pug">
div(v-if="props.viewType === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full")
	div(
		class="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
		v-for="product in products"
		:key="product.id"
	)
		//- Image Container
		router-link(:to="'/products/' + product.id" class="w-full")
			div(class="aspect-square w-full overflow-hidden bg-zinc-800")
				img(
					:src="product.imageUrl || defaultImage"
					class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
					loading="lazy"
				)

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

//- List View
ul(v-else-if="props.viewType === 'list'" class="w-full flex flex-col gap-4")
	li(v-for="product in products" :key="product.id" class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-white/5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300")
		img(:src="product.imageUrl || defaultImage" class="w-20 h-20 rounded-xl object-cover object-center bg-zinc-800 mr-4")
		div(class="flex-1 flex flex-col gap-1")
			span(class="text-lg font-semibold text-white") {{product.name}}
			span(class="text-sm text-zinc-400") {{product.description || 'Premium quality product.'}}
		div(class="flex flex-col items-end gap-2")
			span(class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-orange-400 border border-white/5") ${{product.basePrice}}
			router-link(:to="'/products/' + product.id" class="px-4 py-2 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-200 shadow-md text-xs") View Details
</template>
