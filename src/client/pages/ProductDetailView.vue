<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import NotFoundView from './NotFoundView.vue';
import ProductsList from '../components/common/ProductsList.vue';
import ReviewList from '../components/common/ReviewList.vue';
import type { IProduct } from '@shared/types/index.d.ts';
import type { ICartItem } from '@shared/types/user';
import { useAuthStore } from '../modules/auth/auth.store';
import { useWishlistStore } from '../store/wishlist';
import { useCartStore } from '../store/cart';
import { useRecentlyViewedStore } from '../store/recentlyViewed';

// Use stores
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const recentlyViewedStore = useRecentlyViewedStore();
const user = computed(() => authStore.firebaseUser);
// Use the Firebase user's UID for cart operations
const userId = computed(() => user.value?.uid || '');
const product = ref<IProduct>();
const products = ref([]);
const route = useRoute();
const productId = route.params.productId as string;
const count: number = 4;
const cartItems = ref<ICartItem[]>([]);
const loading = ref(true);
const quantity = ref(1);

// Configure axios with auth token
const api = computed(() => {
	return axios.create({
		headers: {
			Authorization: `Bearer ${authStore.token}`
		}
	});
});


async function SignIn() {
	console.log(`Sign-in Function`);
	const email = prompt('Please Enter your Email to sign in');
	const auth = getAuth();
	const actionCodeSettings = {
		url: `http://localhost:5001/products/${productId}`,
		handleCodeInApp: true,
	};
	if (email) {
		await sendSignInLinkToEmail(auth, email, actionCodeSettings);
		alert("A login link was sent to the email you provided");
		window.localStorage.setItem('emailForSignIn', email);
	}
}

async function created() {
	const auth = getAuth();
	if (isSignInWithEmailLink(auth, window.location.href)) {
		const email = window.localStorage.getItem('emailForSignIn');
		if (email) await signInWithEmailLink(auth, email, window.location.href);
		alert("Successfully Signed in!");
		window.localStorage.removeItem('emailForSignIn');
	}
	try {
		const response = await axios.get(`/api/products/${productId}`);
		product.value = response.data;

		// Only fetch cart if user is authenticated
		if (authStore.token) {
			const cartResponse = await api.value.get(`/api/cart`);
			cartItems.value = cartResponse.data;
		}

		// Use query params for filtering/limiting
		products.value = (await axios.get(`/api/products?limit=${count}`)).data;
	} catch (error) {
		console.error('Error fetching data:', error);
		product.value = {} as IProduct;
	} finally {
		loading.value = false;
	}
}

/**
 * Fetch cart items when user becomes available
 */
async function fetchCartItems() {
	if (authStore.token) {
		try {
			const cartResponse = await api.value.get(`/api/cart`);
			cartItems.value = cartResponse.data;
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	}
}

// Watch for user changes to fetch cart
watch(userId, (newUserId) => {
	if (newUserId) {
		fetchCartItems();
	}
});

onMounted(() => {
	created();
	recentlyViewedStore.trackView(productId);
});

async function addToCart() {
	try {
		await api.value.post(`/api/cart`, { id: productId, quantity: quantity.value });
		alert(`Successfully added ${quantity.value} item(s) to cart`);
		// Refresh cart items
		await fetchCartItems();
	} catch (error) {
		console.error('Error adding to cart:', error);
		alert('Failed to add to cart');
	}
}

const displayPrice = computed(() => {
	if (product.value?.salePrice && product.value.saleStart && product.value.saleEnd) {
		const now = new Date();
		const start = new Date(product.value.saleStart);
		const end = new Date(product.value.saleEnd);
		if (now >= start && now <= end) {
			return product.value.salePrice;
		}
	}
	return product.value?.basePrice || 0;
});

const itemsInCart = computed(() => {
	// Check if the current product is already in the cart by comparing product IDs
	return cartItems.value.some((item: ICartItem) => item.productId === productId);
});

const isOnSale = computed(() => {
	if (product.value?.salePrice && product.value.saleStart && product.value.saleEnd) {
		const now = new Date();
		const start = new Date(product.value.saleStart);
		const end = new Date(product.value.saleEnd);
		return now >= start && now <= end;
	}
	return false;
});
</script>

<template lang="pug">
div(v-if="loading" class="flex justify-center items-center min-h-screen")
	span Loading...

div(v-else-if="product" class="max-w-6xl mx-auto")
	//- Back Button
	router-link( to="/products" class="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors duration-200")
		svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5")
			path(stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18")
		span Back to Products

	div(class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start")
		//- Image Section
		div(class="aspect-square w-full rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 relative group")
			img( :src="product.imageUrl" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105")
			div(class="absolute inset-0 bg-linear-to-t from-zinc-950/20 to-transparent pointer-events-none")

		//- Details Section
		div(class="flex flex-col gap-6 pt-4")
			div
				h1(class="text-4xl md:text-5xl font-bold font-outfit text-white mb-4") {{product.name}}
				div(class="flex items-center gap-4 mb-6")
					span(v-if="isOnSale" class="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20") Sale
					span(class="text-3xl font-semibold text-orange-400") ${{displayPrice}}
					span(v-if="isOnSale" class="text-lg text-zinc-400 line-through") ${{product.basePrice}}
					span(class="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20") In Stock

			div(v-if="product.tags" class="flex flex-wrap gap-2 mb-4")
				span(v-for="tag in product.tags" :key="tag" class="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 transition-colors duration-200") {{tag}}

			div(class="h-px w-full bg-white/10")

			div(class="prose prose-invert max-w-none text-zinc-300")
				p {{product.description || 'Experience premium quality with this exceptional product. Designed for durability and style, it is the perfect addition to your collection.'}}

			div(class="mt-6")
				h3(class="text-xl font-semibold text-white mb-4") Product Details
				ul(class="space-y-2 text-zinc-300")
					li(v-if="product.currency") Currency: {{product.currency}}
					li(v-if="product.taxRate") Tax Rate: {{product.taxRate * 100}}%
					li(v-if="product.vatRate") VAT Rate: {{product.vatRate * 100}}%
					li(v-if="product.dueDate") Available Until: {{new Date(product.dueDate).toLocaleDateString()}}

			//- Trust Badges
			div(class="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5")
				div(class="flex flex-col items-center text-center gap-2")
					svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-zinc-500")
						path(stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.542-7.875-7.875-7.875H9.75M3.375 18.75h1.125M18 10.5h1.875m-1.875 0V8.25m0 2.25H6.625m11.375 0V14.25m0 0h-5.625m5.625 0v3.75m-11.375-3.75h5.625m-5.625 0v-3.75m0 3.75V18.75")
					span(class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold") Free Shipping
				div(class="flex flex-col items-center text-center gap-2")
					svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-zinc-500")
						path(stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z")
					span(class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold") Secure Checkout
				div(class="flex flex-col items-center text-center gap-2")
					svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-zinc-500")
						path(stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z")
					span(class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold") 2 Year Warranty

			//- Show The buttons if the user already signed-in
			div(v-if="user" class="")
				//- Add to cart button
				div(v-if="!itemsInCart" class="mt-8 flex flex-col gap-4")
					div(class="flex items-center gap-4")
						label(for="quantity" class="text-zinc-300 font-medium") Quantity:
						input(id="quantity" v-model.number="quantity" type="number" min="1" max="10" class="w-24 px-4 py-3 rounded-2xl bg-zinc-800 text-white border border-white/5 focus:border-orange-500 focus:outline-none transition-colors duration-200")
					div(class="flex gap-4")
						button(@click="cartStore.addToCart(productId, quantity)" type="button" class="flex-1 px-8 py-5 rounded-2xl bg-white text-zinc-950 font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/5") Add to Cart
						button(@click="wishlistStore.toggleWishlist(productId)" type="button" class="px-5 py-5 rounded-2xl bg-zinc-900 transition-colors duration-200 border border-white/10" :class="wishlistStore.isInWishlist(productId) ? 'text-red-500 border-red-500/30 bg-red-500/5' : 'text-white hover:bg-zinc-800'")
							svg(xmlns="http://www.w3.org/2000/svg" :fill="wishlistStore.isInWishlist(productId) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6")
								path(stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z")

				//- Item is already in cart
				div(v-if="itemsInCart" class="mt-8 flex flex-col gap-4")
					div(class="flex items-center gap-4")
						label(for="quantity" class="text-zinc-300 font-medium") Quantity:
						input(id="quantity" v-model.number="quantity" type="number" min="1" max="10" class="w-24 px-4 py-3 rounded-2xl bg-zinc-800 text-white border border-white/5 opacity-50 cursor-not-allowed")
					div(class="flex gap-4")
						router-link(to="/cart" class="flex-1 px-8 py-5 rounded-2xl bg-zinc-900 text-orange-500 font-bold text-lg text-center border border-orange-500/20 hover:bg-orange-500 hover:text-white transition-all duration-300") View in Cart
						button(@click="wishlistStore.toggleWishlist(productId)" type="button" class="px-5 py-5 rounded-2xl bg-zinc-900 transition-colors duration-200 border border-white/10" :class="wishlistStore.isInWishlist(productId) ? 'text-red-500 border-red-500/30 bg-red-500/5' : 'text-white hover:bg-zinc-800'")
							svg(xmlns="http://www.w3.org/2000/svg" :fill="wishlistStore.isInWishlist(productId) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6")
								path(stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z")

			//- Show sign-in button if the user not signed-in
			button(v-if="!user" @click="SignIn" type="button" class="mt-8 flex-1 px-8 py-5 rounded-2xl bg-zinc-900 text-white font-bold text-lg border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300") Sign In to Purchase

//- Show this section if there is no product
div(v-else)
	NotFoundView
//- Show more related products
div(class="mt-24")
	h3(class="text-3xl font-bold text-white mb-12 font-outfit") Related Products
	ProductsList(:products="products")

//- Reviews Section
div(class="mt-24 border-t border-white/5 pt-24")
	ReviewList(:productId="productId")

</template>
