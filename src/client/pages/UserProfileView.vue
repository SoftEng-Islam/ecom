<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../modules/auth/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const orders = ref<any[]>([]);
const loading = ref(true);

const user = computed(() => authStore.user);
const firebaseUser = computed(() => authStore.firebaseUser);

async function fetchOrders() {
	if (!authStore.token) return;
	try {
		const response = await axios.get('/api/orders', {
			headers: { Authorization: `Bearer ${authStore.token}` }
		});
		orders.value = response.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
	} finally {
		loading.value = false;
	}
}

async function handleLogout() {
	await authStore.logout();
	router.push('/login');
}

function getStatusClass(status: string) {
	const base = "px-2 py-1 rounded-full text-xs font-medium border ";
	switch (status) {
		case 'delivered': return base + "bg-green-500/10 text-green-400 border-green-500/20";
		case 'processing': return base + "bg-blue-500/10 text-blue-400 border-blue-500/20";
		case 'cancelled': return base + "bg-red-500/10 text-red-400 border-red-500/20";
		default: return base + "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
	}
}

onMounted(fetchOrders);
</script>

<template lang="pug">
div(class="max-w-6xl mx-auto px-4 py-12")
	div(v-if="!user && !loading" class="text-center py-12")
		h2(class="text-2xl text-white mb-4") Please sign in to view your profile
		router-link(to="/login" class="inline-block px-8 py-3 bg-orange-500 text-white rounded-xl font-bold") Sign In

	div(v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12")
		//- Profile Sidebar
		div(class="lg:col-span-1 flex flex-col gap-6")
			div(class="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm sticky top-8")
				div(class="flex flex-col items-center text-center")
					img(:src="'https://api.dicebear.com/7.x/identicon/svg?seed=' + user?.email" class="w-24 h-24 rounded-full border-4 border-orange-400/30 mb-4 shadow-xl")
					h2(class="text-2xl font-bold text-white") {{ firebaseUser?.displayName || user?.name }}
					p(class="text-zinc-400 text-sm mb-6") {{ user?.email }}

					div(class="w-full space-y-4 pt-6 border-t border-white/5")
						div(class="flex justify-between text-sm")
							span(class="text-zinc-500") Role
							span(class="text-white") {{ user?.role }}
						div(class="flex justify-between text-sm")
							span(class="text-zinc-500") Phone
							span(class="text-white") {{ user?.phone || 'N/A' }}
						div(class="flex justify-between text-sm")
							span(class="text-zinc-500") Age
							span(class="text-white") {{ user?.age }}

					button(@click="handleLogout" class="w-full mt-8 px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 transition-all") Logout

		//- Orders Section
		div(class="lg:col-span-2 space-y-8")
			h2(class="text-3xl font-bold text-white font-outfit") Order History

			div(v-if="loading" class="space-y-4")
				div(v-for="i in 3" :key="i" class="h-32 bg-zinc-900/50 rounded-2xl animate-pulse border border-white/5")

			div(v-else-if="orders.length === 0" class="bg-zinc-900/50 border border-white/5 rounded-3xl p-12 text-center")
				p(class="text-zinc-400 mb-6") You haven't placed any orders yet.
				router-link(to="/products" class="text-orange-400 font-medium hover:text-orange-300") Start Shopping →

			div(v-else class="space-y-6")
				div(v-for="order in orders" :key="order._id" class="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all group")
					div(class="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-800/20")
						div
							p(class="text-xs text-zinc-500 uppercase tracking-wider mb-1") Order ID
							p(class="text-sm font-mono text-white") {{ order._id }}
						div(class="text-right")
							p(class="text-xs text-zinc-500 uppercase tracking-wider mb-1") Date
							p(class="text-sm text-white") {{ new Date(order.createdAt).toLocaleDateString() }}

					div(class="p-6")
						div(class="flex flex-wrap gap-4 items-center justify-between mb-6")
							div(class="flex gap-2")
								span(:class="getStatusClass(order.status)") {{ order.status }}
								span(v-if="order.paymentStatus === 'paid'" class="px-2 py-1 rounded-full text-xs font-medium border bg-green-500/10 text-green-400 border-green-500/20") Paid
							div(class="text-xl font-bold text-white") Total: ${{ order.totalAmount.toFixed(2) }}

						div(class="space-y-4")
							div(v-for="item in order.items" :key="item.productId" class="flex items-center gap-4 bg-zinc-950/30 p-3 rounded-xl border border-white/5")
								img(:src="item.imageUrl" class="w-12 h-12 rounded-lg object-cover shrink-0")
								div(class="flex-1 min-w-0")
									p(class="text-sm font-medium text-white truncate") {{ item.name }}
									p(class="text-xs text-zinc-500") Qty: {{ item.quantity }}
								p(class="text-sm font-bold text-zinc-300") ${{ (item.price * item.quantity).toFixed(2) }}
</template>
