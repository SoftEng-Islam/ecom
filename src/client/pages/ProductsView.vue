<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from '../store/cart';
import { useRecentlyViewedStore } from '../store/recentlyViewed';
import ProductsList from '../components/common/ProductsList.vue';

const route = useRoute();
const router = useRouter();
const recentlyViewedStore = useRecentlyViewedStore();

// State
const products = ref([]);
const recentlyViewedProducts = ref<any[]>([]);
const categories = ref<string[]>([]);
const loading = ref(true);
const viewType = ref('grid');

// Filter state from query params
const filters = ref({
  search: (route.query.search as string) || '',
  type: (route.query.type as string) || '',
  minPrice: Number(route.query.minPrice) || null,
  maxPrice: Number(route.query.maxPrice) || null,
  rating: Number(route.query.rating) || null,
  sort: (route.query.sort as string) || 'newest'
});

async function fetchCategories() {
  try {
    const res = await axios.get('/api/products/categories');
    categories.value = res.data;
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }
}

async function fetchProducts() {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (filters.value.search) params.append('name', filters.value.search);
    if (filters.value.type) params.append('type', filters.value.type);
    if (filters.value.minPrice) params.append('minPrice', filters.value.minPrice.toString());
    if (filters.value.maxPrice) params.append('maxPrice', filters.value.maxPrice.toString());
    if (filters.value.rating) params.append('rating', filters.value.rating.toString());
    if (filters.value.sort) params.append('sort', filters.value.sort);
    params.append('limit', '40');

    const response = await axios.get(`/api/products?${params.toString()}`);
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
}

async function fetchRecentlyViewed() {
  if (recentlyViewedStore.items.length === 0) {
    recentlyViewedProducts.value = [];
    return;
  }
  try {
    // We could make a bulk fetch endpoint, but for now just filter local or fetch top ones
    const ids = recentlyViewedStore.items.slice(0, 5).join(',');
    const res = await axios.get(`/api/products?ids=${ids}`); // I should support ids filter in backend
    recentlyViewedProducts.value = res.data;
  } catch (err) {
    console.error('Failed to fetch recently viewed:', err);
  }
}

function updateURL() {
  const query: any = {};
  if (filters.value.search) query.search = filters.value.search;
  if (filters.value.type) query.type = filters.value.type;
  if (filters.value.minPrice) query.minPrice = filters.value.minPrice;
  if (filters.value.maxPrice) query.maxPrice = filters.value.maxPrice;
  if (filters.value.rating) query.rating = filters.value.rating;
  if (filters.value.sort) query.sort = filters.value.sort;
  router.push({ query });
}

function clearFilters() {
  filters.value = {
    search: '',
    type: '',
    minPrice: null,
    maxPrice: null,
    rating: null,
    sort: 'newest'
  };
  updateURL();
}

// Watchers
watch(() => route.query, () => {
  filters.value.search = (route.query.search as string) || '';
  filters.value.type = (route.query.type as string) || '';
  fetchProducts();
}, { deep: true });

watch(() => recentlyViewedStore.items, fetchRecentlyViewed, { immediate: true });

onMounted(() => {
  fetchCategories();
  fetchProducts();
  fetchRecentlyViewed();
});
</script>

<template lang="pug">
div(class="flex flex-col lg:flex-row gap-12 pt-8")
  //- Sidebar Filters
  aside(class="w-full lg:w-72 shrink-0 space-y-10")
    div
      h3(class="text-white font-bold mb-6 text-xl") Search
      div(class="relative")
        input( v-model="filters.search" @keyup.enter="updateURL" placeholder="Keyword..." class="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-orange-500 transition-colors")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5 absolute right-4 top-4 text-zinc-500")
          path(stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z")

    div
      h3(class="text-white font-bold mb-6 text-xl") Categories
      div(class="space-y-3")
        div( v-for="cat in categories" :key="cat" @click="filters.type = (filters.type === cat ? '' : cat); updateURL()" class="flex items-center gap-3 cursor-pointer group")
          div(class="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center transition-all group-hover:border-orange-500/50" :class="filters.type === cat ? 'bg-orange-500 border-orange-500' : 'bg-transparent'")
            svg(v-if="filters.type === cat" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-3 text-white")
              path(stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5")
          span(class="text-sm transition-colors" :class="filters.type === cat ? 'text-white font-bold' : 'text-zinc-500 group-hover:text-zinc-300'") {{ cat }}

    div
      h3(class="text-white font-bold mb-6 text-xl") Price Range
      div(class="grid grid-cols-2 gap-4")
        input(v-model.number="filters.minPrice" @change="updateURL" type="number" placeholder="Min" class="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white")
        input(v-model.number="filters.maxPrice" @change="updateURL" type="number" placeholder="Max" class="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white")

    div
      h3(class="text-white font-bold mb-6 text-xl") Minimum Rating
      div(class="space-y-4")
        div( v-for="r in [4, 3, 2]" :key="r" @click="filters.rating = (filters.rating === r ? null : r); updateURL()" class="flex items-center gap-3 cursor-pointer group")
          div(class="flex gap-1")
            svg(v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4" :class="i <= r ? 'text-orange-500' : 'text-zinc-800'")
              path(fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd")
          span(class="text-xs font-medium" :class="filters.rating === r ? 'text-orange-500' : 'text-zinc-600'") & Up

    button(@click="clearFilters" class="w-full py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border-t border-white/5 pt-8 mb-10")
      | Clear All Filters

    //- Recently Viewed Sidebar Section
    div(v-if="recentlyViewedProducts.length > 0")
      h3(class="text-white font-bold mb-6 text-xl") Recently Viewed
      div(class="space-y-6")
        router-link( v-for="p in recentlyViewedProducts" :key="p.id" :to="`/products/${p.id}`" class="flex items-center gap-4 group")
          div(class="h-16 w-16 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden shrink-0")
            img(:src="p.imageUrl" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500")
          div(class="flex-1 min-w-0")
            p(class="text-sm font-medium text-white truncate") {{ p.name }}
            p(class="text-xs text-orange-500 font-bold") $ {{ p.salePrice || p.basePrice }}

  //- Main Content
  main(class="flex-1")
    div(class="flex justify-between items-center mb-10")
      div
        h1(class="text-4xl font-bold text-white mb-2 font-outfit") Browse Collection
        p(class="text-zinc-500") Found {{ products.length }} items

      div(class="flex gap-4 items-center")
        select(v-model="filters.sort" @change="updateURL" class="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-orange-500")
          option(value="newest") Newest Arrivals
          option(value="price_low") Price: Low to High
          option(value="price_high") Price: High to Low
          option(value="popular") Most Popular

    div(v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8")
      div(v-for="i in 6" :key="i" class="h-80 bg-zinc-900/50 rounded-3xl animate-pulse border border-white/5")

    ProductsList(v-else :products="products" :view-type="viewType")
</template>
