<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import NotFoundView from './NotFoundView.vue';
import ProductsList from '../components/ProductsList.vue';
import { type IProduct } from '../types/product.type';
import { type User } from "firebase/auth";

const props = defineProps<{
	user: User;
}>();


const user = props.user;
const userId: string = user.uid;
const product = ref<IProduct>();
const products = ref([]);
const route = useRoute();
const productId: string = route.params.productId as string;
const count: number = 4;
const cartItems = ref([{}]);
const loading = ref(true);
const quantity = ref(1);


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

		const cartResponse = await axios.get(`/api/users/${userId}/cart`);
		cartItems.value = cartResponse.data;

		products.value = (await axios.get(`/api/products/few/${count}`)).data;
	} catch (error) {
		console.error('Error fetching data:', error);
		product.value = {} as IProduct;
	} finally {
		loading.value = false;
	}
}
onMounted(created);

async function addToCart() {
	try {
		await axios.post(`/api/users/${userId}/cart`, { id: productId, quantity: quantity.value });
		alert(`Successfully added ${quantity.value} item(s) to cart`);
		// Refresh cart items
		const cartResponse = await axios.get(`/api/users/${userId}/cart`);
		cartItems.value = cartResponse.data;
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
	return cartItems.value.includes(productId);
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

			//- Show The buttons if the user already signed-in
			div(v-if="user" class="")
				//- Add to cart button
				div(v-if="!itemsInCart" class="mt-8 flex flex-col gap-4")
					div(class="flex items-center gap-4")
						label(for="quantity" class="text-zinc-300 font-medium") Quantity:
						input(id="quantity" v-model.number="quantity" type="number" min="1" max="10" class="w-20 px-3 py-2 rounded-lg bg-zinc-800 text-white border border-white/5 focus:border-orange-400 focus:outline-none transition-colors duration-200")
					div(class="flex gap-4")
						button(@click="addToCart" type="button" class="flex-1 px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-200 transition-colors duration-200 shadow-lg shadow-white/5") Add to Cart
						button(type="button" class="px-4 py-4 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors duration-200 border border-white/5")
							svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6")
								path(stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z")
				//- Item is already in cart
				div(v-if="user && itemsInCart" class="mt-8 flex flex-col gap-4")
					div(class="flex items-center gap-4")
						label(for="quantity" class="text-zinc-300 font-medium") Quantity:
						input(id="quantity" v-model.number="quantity" type="number" min="1" max="10" class="w-20 px-3 py-2 rounded-lg bg-zinc-800 text-white border border-white/5 focus:border-orange-400 focus:outline-none transition-colors duration-200")
					div(class="flex gap-4")
						button(type="button" class="flex-1 px-8 py-4 rounded-xl bg-zinc-800 text-white font-bold text-lg cursor-not-allowed border border-white/5") Item is already in cart
						button(type="button" class="px-4 py-4 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors duration-200 border border-white/5")
							svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6")
								path(stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z")
			//- Show sign-in button if the user not signed-in
			button(v-if="!user" @click="SignIn" type="button" class="sign-in flex-1 px-8 py-4 rounded-xl bg-zinc-800 text-white font-bold text-lg border border-white/5 cursor-pointer hover:bg-blue-500") Sign In to add to cart
//- Show this section if there is no product
div(v-else)
	NotFoundView
//- Show more related products
div(class="mt-16")
	h3(class="text-2xl font-bold text-white mb-8") Related Products
	ProductsList(:products="products")

</template>
