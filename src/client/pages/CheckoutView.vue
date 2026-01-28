<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../modules/auth/auth.store';
import axios from 'axios';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const shippingAddress = ref({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
});

const subtotal = computed(() => {
    return cartStore.items.reduce((sum, item) => {
        const price = item.product?.salePrice || item.product?.basePrice || 0;
        return sum + (price * item.quantity);
    }, 0);
});

const shipping = computed(() => 5.00); // Flat shipping for simplicity
const total = computed(() => subtotal.value + shipping.value);

onMounted(async () => {
    if (cartStore.items.length === 0) {
        await cartStore.fetchCart();
    }
    // Redirect if cart is empty after fetch
    if (cartStore.items.length === 0) {
        router.push('/products');
    }
});

async function handleCheckout() {
    if (!authStore.token) return;

    loading.value = true;
    try {
        const orderItems = cartStore.items.map(item => ({
            productId: item.productId,
            name: item.product?.name,
            price: item.product?.salePrice || item.product?.basePrice,
            quantity: item.quantity,
            imageUrl: item.product?.imageUrl
        }));

        const orderData = {
            items: orderItems,
            totalAmount: total.value,
            shippingAddress: shippingAddress.value
        };

        await axios.post('/api/orders', orderData, {
            headers: { Authorization: `Bearer ${authStore.token}` }
        });

        // Clear cart in store
        cartStore.items = [];
        alert('Order placed successfully!');
        router.push('/profile');
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Failed to place order. Please try again.');
    } finally {
        loading.value = false;
    }
}
</script>

<template lang="pug">
div(class="max-w-6xl mx-auto px-4 py-12")
  h1(class="text-4xl font-bold text-white mb-12 font-outfit") Checkout

  div(class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start")
    //- Checkout Form
    div(class="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm")
      h2(class="text-2xl font-bold text-white mb-8") Shipping Address
      form(@submit.prevent="handleCheckout" class="space-y-6")
        div(class="grid grid-cols-1 gap-6")
          div
            label(class="block text-sm font-medium text-zinc-400 mb-2") Street Address
            input(v-model="shippingAddress.street" required class="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors")

          div(class="grid grid-cols-2 gap-6")
            div
              label(class="block text-sm font-medium text-zinc-400 mb-2") City
              input(v-model="shippingAddress.city" required class="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors")
            div
              label(class="block text-sm font-medium text-zinc-400 mb-2") State / Province
              input(v-model="shippingAddress.state" required class="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors")

          div(class="grid grid-cols-2 gap-6")
            div
              label(class="block text-sm font-medium text-zinc-400 mb-2") ZIP / Postal Code
              input(v-model="shippingAddress.zipCode" required class="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors")
            div
              label(class="block text-sm font-medium text-zinc-400 mb-2") Country
              select(v-model="shippingAddress.country" class="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors")
                option United States
                option Canada
                option United Kingdom
                option Germany
                option France

        button(type="submit" :disabled="loading" class="w-full mt-8 bg-white text-zinc-950 font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-xl shadow-white/5")
          span(v-if="loading") Processing...
          span(v-else) Complete Purchase

    //- Order Summary
    div(class="lg:sticky lg:top-8 flex flex-col gap-8")
      div(class="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm")
        h2(class="text-2xl font-bold text-white mb-8") Order Summary
        div(class="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar")
          div(v-for="item in cartStore.items" :key="item.productId" class="flex gap-4 items-center")
            div(class="h-16 w-16 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0")
              img(:src="item.product?.imageUrl" class="h-full w-full object-cover")
            div(class="flex-1 min-w-0")
              h3(class="text-sm font-medium text-white truncate") {{ item.product?.name }}
              p(class="text-xs text-zinc-500") Qty: {{ item.quantity }}
            div(class="text-sm font-medium text-white")
              | ${{ ((item.product?.salePrice || item.product?.basePrice || 0) * item.quantity).toFixed(2) }}

        div(class="space-y-4 pt-6 border-t border-white/10")
          div(class="flex justify-between text-zinc-400")
            span Subtotal
            span ${{ subtotal.toFixed(2) }}
          div(class="flex justify-between text-zinc-400")
            span Shipping
            span ${{ shipping.toFixed(2) }}
          div(class="flex justify-between text-white text-xl font-bold pt-4")
            span Total
            span ${{ total.toFixed(2) }}

      div(class="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20")
        div(class="flex gap-4 items-start")
          svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-orange-400 flex-shrink-0")
            path(stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z")
          p(class="text-sm text-orange-200/80") This is a secure payment simulation. No real credit card information is required for this demo.
</template>

<style scoped lang="sass">
.custom-scrollbar::-webkit-scrollbar
  width: 4px
.custom-scrollbar::-webkit-scrollbar-track
  background: transparent
.custom-scrollbar::-webkit-scrollbar-thumb
  background: rgba(255, 255, 255, 0.1)
  border-radius: 10px
</style>
