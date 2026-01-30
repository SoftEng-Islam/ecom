<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useMotion } from '@vueuse/motion';
import type { IProduct } from '@shared/types';
const trendingProducts = ref<IProduct[]>([]);
const loading = ref(true);
const limit: number = 10;
const heroImage = ref("");
const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: '/assets/electronics.png',
    desc: 'Cutting-edge tech',
  },
  { name: 'Fashion', slug: 'fashion', image: '/assets/fashion.png', desc: 'Timeless style' },
  {
    name: 'Home & Living',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1484101403033-57105d2b77ca?q=80&w=2670&auto=format&fit=crop',
    desc: 'Comfort & design',
  },
];

const trustSignals = [
  {
    title: 'Free Shipping',
    desc: 'On orders over $100',
    icon: 'M13.5 21V10.5h8.25M13.5 21H3.75M13.5 21v-4.5h4.5v4.5m-18-4.5H3.75m0 0V3.75m0 0h16.5M3.75 3.75v16.5',
  },
  {
    title: 'Secure Payment',
    desc: '100% encrypted',
    icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  },
  {
    title: '24/7 Support',
    desc: 'Always here for you',
    icon: 'M18 18.72a9.094 9.094 0 0 0 3.741-4.702 4 4 0 0 0-3.535-3.535 9.094 9.094 0 0 0-4.702 3.741 4 4 0 0 0 3.535 3.535Zm-12 0a9.094 9.094 0 0 1-3.741-4.702 4 4 0 0 1 3.535-3.535 9.094 9.094 0 0 1 4.702 3.741 4 4 0 0 1-3.535 3.535ZM12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  },
];

async function fetchTrending() {
  try {
    const response = await axios.get(`http://localhost:5001/api/products?limit=${limit}`);
    trendingProducts.value = response.data;
  } catch (err) {
    console.error('Failed to fetch trending:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTrending);
</script>

<template lang="pug">
div(class="space-y-24 pb-24")
  //- Hero Section
  section(class="relative h-[80vh] min-h-[600px] w-full overflow-hidden rounded-[3rem]")
    img(:src="heroImage" class="absolute inset-0 w-full h-full object-cover scale-105")
    div(class="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent")
    div(class="absolute inset-0 flex flex-col items-center justify-center text-center px-6")
      h1(v-motion-slide-visible-bottom class="text-6xl md:text-8xl font-bold text-white mb-6 font-outfit tracking-tight")
        | Future of
        span(class="text-orange-500")  Shopping
      p(v-motion-slide-visible-bottom :delay="200" class="text-xl text-zinc-300 max-w-2xl mb-10 leading-relaxed")
        | Discover curated collections, cutting-edge technology, and timeless style. Experience the pinnacle of e-commerce.
      div(v-motion-slide-visible-bottom :delay="400" class="flex gap-4")
        router-link(to="/products" class="px-10 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-2xl shadow-white/10") Shop Collection
        router-link(to="/categories" class="px-10 py-4 bg-zinc-900/80 backdrop-blur-md text-white border border-white/10 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all duration-300") Explore Categories

  //- Featured Categories
  section(class="max-w-7xl mx-auto px-6")
    div(class="flex justify-between items-end mb-12")
      div
        h2(class="text-4xl font-bold text-white mb-2 font-outfit") Popular Categories
        p(class="text-zinc-500") Handpicked selections just for you
      router-link(to="/categories" class="text-orange-500 font-semibold hover:text-orange-400 flex items-center gap-2 transition-colors")
        | View All
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5")
          path(stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3")

    div(class="grid grid-cols-1 md:grid-cols-3 gap-8")
      router-link( v-for="cat in categories" :key="cat.slug" :to="`/products?type=${cat.slug}`" class="group relative h-[450px] overflow-hidden rounded-[2.5rem] border border-white/5")
        img(:src="cat.image" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700")
        div(class="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent opacity-80 group-hover:opacity-90 transition-opacity")
        div(class="absolute bottom-10 left-10")
          h3(class="text-2xl font-bold text-white mb-1") {{ cat.name }}
          p(class="text-zinc-400 text-sm") {{ cat.desc }}

  //- Trust Signal Banner
  section(class="bg-zinc-900/30 border-y border-white/5 py-12")
    div(class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12")
      div(v-for="signal in trustSignals" :key="signal.title" class="flex gap-6 items-center")
        div(class="shrink-0 w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20")
          svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7")
            path(stroke-linecap="round" stroke-linejoin="round" :d="signal.icon")
        div
          h4(class="text-white font-bold text-lg") {{ signal.title }}
          p(class="text-zinc-500 text-sm") {{ signal.desc }}

  //- Trending Section Preview
  section(class="max-w-7xl mx-auto px-6")
    div(class="text-center mb-16")
      h2(class="text-5xl font-bold text-white mb-4 font-outfit") Trending Now
      p(class="text-zinc-500 max-w-xl mx-auto") Our most wanted items from the community. Get them before they're gone.

    div(v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8")
      div(v-for="i in 4" :key="i" class="h-[400px] bg-zinc-900/50 rounded-3xl animate-pulse border border-white/5")

    div(v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8")
      router-link( v-for="p in trendingProducts" :key="p.id" :to="`/products/${p.id}`" class="group bg-zinc-900/50 border border-white/5 rounded-4xl p-4 hover:border-orange-500/50 transition-all duration-300" )
        div(class="aspect-square rounded-2xl overflow-hidden mb-6 relative bg-zinc-800")
          img(:src="p.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500")
          div(v-if="p.salePrice" class="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full") SALE
        h3(class="text-white font-bold mb-1 truncate px-2") {{ p.name }}
        div(class="flex justify-between items-center px-2")
          div(class="flex items-center gap-2")
            p(class="text-orange-500 font-bold") ${{ p.salePrice || p.basePrice }}
            p(v-if="p.salePrice" class="text-zinc-500 text-sm line-through") ${{ p.basePrice }}
          div(class="flex items-center gap-1")
            svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 text-orange-500")
              path(fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd")
            span(class="text-zinc-400 text-sm") 4.8
</template>

<style scoped lang="sass">

</style>
