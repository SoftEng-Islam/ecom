<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categories = ref([]);

async function fetchCategories() {
	const response = await axios.get('/api/products/categories');
	categories.value = response.data;
}

onMounted(fetchCategories);
</script>

<template lang="pug">
div(class="mb-8")
	h1(class="text-3xl font-bold font-outfit text-white mb-2") Categories
	p(class="text-zinc-400 mb-6") Browse products by category.
	div(class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6")
		div(v-for="cat in categories" :key="cat" class="flex flex-col items-center gap-2 p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all cursor-pointer group")
			div(class="w-14 h-14 rounded-full bg-orange-400/10 flex items-center justify-center text-2xl text-orange-400 group-hover:bg-orange-400/20 group-hover:text-orange-500 font-bold uppercase")
				span {{ cat[0] }}
			span(class="text-base font-semibold text-white mt-2") {{ cat }}
</template>
