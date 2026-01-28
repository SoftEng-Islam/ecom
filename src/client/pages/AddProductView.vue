<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const description = ref('');
const basePrice = ref('');
const currency = ref('USD');
const imageUrl = ref('');
const tags = ref('');
const type = ref('food');
const message = ref('');
const loading = ref(false);

async function addProduct() {
	if (!name.value || !basePrice.value) {
		message.value = 'Name and price are required.';
		return;
	}
	loading.value = true;
	try {
		await axios.post('/api/products', {
			name: name.value,
			description: description.value,
			basePrice: parseFloat(basePrice.value),
			currency: currency.value,
			imageUrl: imageUrl.value,
			tags: tags.value.split(',').map(t => t.trim()).filter(Boolean),
			type: type.value,
		});
		message.value = 'Product added successfully!';
		name.value = description.value = basePrice.value = imageUrl.value = tags.value = '';
		type.value = 'food';
		currency.value = 'USD';
	} catch (e) {
		message.value = 'Failed to add product.';
	} finally {
		loading.value = false;
	}
}
</script>

<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col gap-6")
		h2(class="text-2xl font-bold text-white mb-2 text-center") Add New Product
		form(@submit.prevent="addProduct" class="flex flex-col gap-4")
			input(type="text" v-model="name" placeholder="Product Name*" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			textarea(v-model="description" placeholder="Description" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base resize-none min-h-[80px]")
			input(type="number" v-model="basePrice" placeholder="Base Price*" min="0" step="0.01" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			input(type="text" v-model="currency" placeholder="Currency" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			input(type="text" v-model="imageUrl" placeholder="Image URL" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			input(type="text" v-model="tags" placeholder="Tags (comma separated)" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			select(v-model="type" class="px-4 py-3 rounded-lg bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
				option(value="food") Food
				option(value="drink") Drink
				option(value="dessert") Dessert
				option(value="other") Other
			button(type="submit" :disabled="loading" class="px-4 py-3 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed")
				span(v-if="!loading") Add Product
				span(v-else) Adding...
		div(class="text-sm text-orange-400 mt-2 text-center min-h-6") {{message}}
</template>
