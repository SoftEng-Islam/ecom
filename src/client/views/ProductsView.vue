<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductsList from '../components/ProductsList.vue';
import FindProduct from "../components/FindProduct.vue";
const products = ref([]);
async function created() {
	const response = await axios.get('/api/products');
	const _products = response.data;
	products.value = _products;
}

onMounted(created);

</script>
<template lang="pug">
div(class="mb-8")
	h1(class="text-3xl font-bold font-outfit text-white mb-2") Browse Products
	p(class="text-zinc-400") Discover our collection of premium items.
find-product(class="mb-8")
ProductsList(:products="products")
</template>
