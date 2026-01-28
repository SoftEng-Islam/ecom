<script setup lang="ts">
import { ref } from 'vue';

interface Product {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	quantity: number;
	stock: number;
}

const props = defineProps<{
	products: Product[];
}>();

const emit = defineEmits<{
	(e: 'update-quantity', id: number, quantity: number): void;
	(e: 'remove-from-cart', id: number): void;
	(e: 'save-for-later', id: number): void;
}>();

function updateQuantity(productId: number, newQuantity: number) {
	if (newQuantity >= 1 && newQuantity <= 100) {
		emit('update-quantity', productId, newQuantity);
	}
}

function removeFromCart(productId: number) {
	emit('remove-from-cart', productId);
}

function saveForLater(productId: number) {
	emit('save-for-later', productId);
}

// Format price with 2 decimal places
function formatPrice(price: number) {
	return price.toFixed(2);
}
</script>
<template lang="pug">
div(class="space-y-4 w-full")
  //- Cart item
  div(v-for="product in products" :key="product.id" class="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-300")
    //- Product image
    router-link(:to="`/products/${product.id}`" class="w-full sm:w-24 h-24 flex-shrink-0 rounded-xl bg-zinc-800 overflow-hidden")
      img(:src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300")

    //- Product details
    div(class="flex-1 w-full min-w-0")
      div(class="flex flex-col sm:flex-row sm:items-center justify-between gap-2")
        div(class="min-w-0")
          h3(class="text-base font-medium text-white truncate")
            router-link(:to="`/products/${product.id}`" class="hover:text-orange-400 transition-colors") {{ product.name }}
          p(class="text-sm text-zinc-400") ${{ formatPrice(product.price) }} each

      //- Quantity controls and actions
      div(class="flex items-center justify-between mt-3 sm:mt-4")
        //- Quantity selector
        div(class="flex items-center border border-white/10 rounded-lg overflow-hidden bg-zinc-900/50")
          button(@click="updateQuantity(product.id, product.quantity - 1)" :disabled="product.quantity <= 1" class="px-3 py-1.5 text-zinc-400 hover:bg-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Decrease quantity")
            svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4")
              path(stroke-linecap="round" stroke-linejoin="round" d="M18 12H6")

          span(class="w-8 text-center text-sm font-medium") {{ product.quantity }}

          button(@click="updateQuantity(product.id, product.quantity + 1)" :disabled="product.quantity >= product.stock" class="px-3 py-1.5 text-zinc-400 hover:bg-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Increase quantity")
            svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4")
              path(stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6")

        //- Item subtotal
        div(class="text-right")
          p(class="text-base font-semibold text-orange-400") ${{ formatPrice(product.price * product.quantity) }}
          p(class="text-xs text-zinc-500" v-if="product.quantity > 1") ${{ formatPrice(product.price) }} each

    //- Action buttons
    div(class="absolute top-3 right-3 sm:static flex items-center gap-2")
      button(@click="saveForLater(product.id)" type="button" class="p-1.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors duration-200" title="Save for later")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5")
          path(stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z")

      button(@click="removeFromCart(product.id)" type="button" class="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200" title="Remove from cart")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5")
          path(stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0")

  //- Empty state (handled by parent)
  div(class="text-center py-8 text-zinc-400" v-if="!products || products.length === 0")
    p Your cart is empty
</template>
