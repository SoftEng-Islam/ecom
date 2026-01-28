<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../modules/auth/auth.store';
import ShoppingCartList from '../components/common/ShoppingCartList.vue';

const cartStore = useCartStore();
const authStore = useAuthStore();

// Fetch cart when component mounts if user is already available
onMounted(async () => {
  if (authStore.firebaseUser) {
    await cartStore.fetchCart();
  }
});

// Watch for user session to initialize or change
watch(() => authStore.firebaseUser, async (newUser) => {
  if (newUser) {
    await cartStore.fetchCart();
  } else {
    cartStore.items = [];
  }
});

// Handle retry
const handleRetry = async () => {
  await cartStore.fetchCart();
};

// Mapped items for the list component
const mappedItems = computed(() => {
  return cartStore.items.map(item => ({
    id: item.productId,
    name: item.product?.name || 'Loading...',
    price: item.product?.salePrice || item.product?.basePrice || 0,
    imageUrl: item.product?.imageUrl || '',
    quantity: item.quantity,
    stock: 99 // Defaulting stock since it's not in the product model yet
  }));
});

// Calculate totals using the mapped items
const subtotal = computed(() => {
  return mappedItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const shipping = computed(() => 0);
const total = computed(() => subtotal.value + shipping.value);
</script>

<template lang="pug">
div(class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8")
  //- Loading state
  div(v-if="cartStore.isLoading")
    div(class="space-y-6 animate-pulse")
      div(v-for="i in 3" :key="i" class="h-32 bg-zinc-800/50 rounded-2xl")
      div(class="h-40 bg-zinc-800/50 rounded-2xl mt-6")

  //- Error state
  div(v-else-if="cartStore.error" class="bg-red-900/30 border border-red-500/30 text-red-100 p-6 rounded-2xl text-center")
    p {{ cartStore.error }}
    button(
      @click="handleRetry"
      class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition-colors"
    ) Retry

  //- Empty cart
  div(v-else-if="cartStore.items.length === 0" class="text-center py-12")
    div(class="mx-auto h-24 w-24 text-gray-400" aria-hidden="true")
      svg(fill="none" viewBox="0 0 24 24" stroke="currentColor")
        path(stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0h10a2 2 0 002-2v-5a2 2 0 00-2-2H7m10 0H7m0 0H5m2 0H5m2 0h2m0 0h2m-2 0h2m-2 0h2")
    h3(class="mt-4 text-lg font-medium text-gray-100") Your cart is empty
    p(class="mt-1 text-gray-400") Start adding some items to your cart
    div(class="mt-6")
      router-link(
        to="/products"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      ) Continue Shopping

  //- Cart with items
  div(v-else class="bg-zinc-800/50 rounded-2xl overflow-hidden shadow")
    div(class="px-4 py-5 sm:px-6 border-b border-zinc-700")
      h2(class="text-lg font-medium text-white") Shopping Cart
    div(aria-hidden="true" class="px-4 py-5 sm:p-6")
      ShoppingCartList(
        :products="mappedItems"
        @update-quantity="(id, quantity) => cartStore.updateQuantity(id, quantity)"
        @remove-from-cart="(id) => cartStore.removeFromCart(id)"
      )
    div(class="border-t border-zinc-700 px-4 py-5 sm:px-6")
      div(class="flex justify-between text-base font-medium text-white")
        p Subtotal
        p ${{ subtotal.toFixed(2) }}
      p(class="mt-0.5 text-sm text-gray-400") Shipping and taxes calculated at checkout.
      div(class="mt-6")
        button(
          @click="$router.push('/checkout')"
          class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        ) Proceed to Checkout
      div(class="mt-6 flex justify-center text-sm text-center text-gray-400")
        p
          | or
          router-link(
            to="/products"
            class="text-orange-500 font-medium hover:text-orange-400"
          ) Continue Shopping
          |  for more items
</template>
