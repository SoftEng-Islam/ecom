<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { type User } from "firebase/auth";
import ShoppingCartList from '../components/ShoppingCartList.vue';

const props = defineProps<{
	user: User;
}>();

const user = props.user;
const userId: string = user.uid;
const cartItems = ref([]);

if (user) {
	async function created() {
		const response = await axios.get(`/api/users/${userId}/cart`);
		cartItems.value = response.data;
	}

	async function removeFromCart(productId: number) {
		console.log(`cart View: ${productId}`);
		const response = await axios.delete(`/api/users/${userId}/cart/${productId}`);
		const updatedCart = response.data;
		cartItems.value = updatedCart;
	}
	onMounted(created);
} else {
	console.log(`There is no user to show the cart items`);
}

</script>
<template lang="pug">
div(class="max-w-4xl mx-auto")
	header(class="mb-8 flex items-center justify-between")
		div
			h1(class="text-3xl font-bold font-outfit text-white mb-2") Shopping Cart
			p(class="text-zinc-400") Review and manage your selected items.

		div(v-if="cartItems.length > 0" class="text-right")
			span(class="text-sm text-zinc-500") Total Items
			p(class="text-xl font-semibold text-white") {{cartItems.length}}

	div(v-if="cartItems.length > 0" class="flex flex-col gap-6")
		div(class="bg-zinc-900/30 rounded-3xl border border-white/5 p-6 backdrop-blur-sm")
			ShoppingCartList(@remove-from-cart="removeFromCart($event)" :products="cartItems")

		div(class="flex justify-end pt-4 border-t border-white/5")
			button(
				type="button"
				class="cursor-pointer px-8 py-3 rounded-xl bg-linear-to-r from-orange-500 to-pink-600 text-white font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300"
			) Proceed to Checkout

	div(v-else class="flex flex-col items-center justify-center py-20 text-center")
		div(class="size-24 rounded-full bg-zinc-900 flex items-center justify-center mb-6")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-zinc-600")
				path(stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 5.407c.441 1.889.661 2.833.088 3.475-.575.641-1.544.641-3.483.641H8.528c-1.939 0-2.908 0-3.483-.641-.573-.642-.353-1.586.088-3.475l1.263-5.407c.24-1.028.36-1.542.756-1.825S7.974 4.5 9 4.5h6c1.026 0 1.54 0 1.935.263.396.282.516.797.756 1.825Z")
		h2(class="text-2xl font-bold text-white mb-2") Your cart is empty
		p(class="text-zinc-400 mb-8 max-w-sm") Looks like you haven't added anything to your cart yet. Browse our products to find something you like.
		router-link(to="/products" class="text-orange-400 hover:text-orange-300 font-medium hover:underline") Browse Products
</template>
