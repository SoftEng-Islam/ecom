<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ProductsList from '../components/common/ProductsList.vue';

const trendingProducts = ref([]);
const viewType = ref('grid');

async function fetchTrending() {
	const response = await axios.get('/api/products/trending');
	trendingProducts.value = response.data;
}

onMounted(fetchTrending);
</script>

<template lang="pug">
div(class="mb-8")
	h1(class="text-3xl font-bold font-outfit text-white mb-2") Trending Products
	p(class="text-zinc-400 mb-6") Discover what's hot right now!
	ProductsList(:products="trendingProducts" :view-type="viewType")
</template>
