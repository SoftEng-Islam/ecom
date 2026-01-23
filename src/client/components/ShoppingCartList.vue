<script setup lang="ts">
import axios from "axios";
const cartItems = defineProps<{
	products: [];
}>();
const emit = defineEmits<{
	(e: 'remove-from-cart', id: number): void;
}>();

async function removeFromCart(_id: number) {
	console.log(`cartlist: ${_id}`);
	emit('remove-from-cart', _id);
}


</script>
<template lang="pug">
div(class="flex flex-col gap-4 w-full")
	div(
		v-for="product in cartItems.products"
		:key="product.id"
		class="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-300"
	)
		div(class="flex items-center gap-4 h-20")
			div(class="aspect-square h-full overflow-hidden rounded-xl bg-zinc-800")
				img(class="h-full w-full object-cover" :src="`../../../` + product.imageUrl")

			div(class="flex flex-col")
				h3(class="text-lg font-medium text-white") {{product.name}}
				p(class="text-sm text-zinc-400") Unit Price

		div(class="flex items-center gap-8")
			span(class="text-lg font-semibold text-orange-400") ${{product.price}}

			button(
				@click="removeFromCart(product.id)"
				type="button"
				class="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200"
				title="Remove from cart"
			)
				//- Quick trash icon SVG
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5")
					path(stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0")
</template>
