<script setup lang="ts">
import { ref, onMounted } from 'vue';

const stats = ref([
    { label: 'Total Products', value: 100 },
    { label: 'Total Users', value: 10 },
    { label: 'Orders Today', value: 23 },
    { label: 'Revenue', value: '$1,250' },
]);

const recentOrders = ref([
    { id: 'ORD-001', user: 'John Doe', total: '$24.99', status: 'Delivered', date: '2024-06-20' },
    { id: 'ORD-002', user: 'Jane Smith', total: '$15.49', status: 'Pending', date: '2024-06-20' },
    { id: 'ORD-003', user: 'Alice Johnson', total: '$32.00', status: 'Shipped', date: '2024-06-19' },
]);
</script>
<template lang="pug">
div(class="min-h-screen flex flex-col items-center justify-center bg-zinc-950")
	div(class="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col gap-10 mt-10")
		h1(class="text-3xl font-bold text-white mb-2 font-outfit text-center") Dashboard
		div(class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6")
			div(v-for="s in stats" :key="s.label" class="flex flex-col items-center gap-2 bg-zinc-900 border border-white/10 rounded-xl p-6 text-center")
				span(class="text-2xl font-bold text-orange-400") {{ s.value }}
				span(class="text-zinc-400 text-sm") {{ s.label }}
		div(class="mt-10")
			h2(class="text-xl font-bold text-white mb-4") Recent Orders
			table(class="w-full text-left text-zinc-300 text-sm bg-zinc-900 rounded-xl overflow-hidden")
				thead
					tr
						th(class="py-2 px-4") Order ID
						th(class="py-2 px-4") User
						th(class="py-2 px-4") Total
						th(class="py-2 px-4") Status
						th(class="py-2 px-4") Date
				tbody
					tr(v-for="o in recentOrders" :key="o.id" class="hover:bg-orange-400/10 transition-all")
						td(class="py-2 px-4 font-semibold text-orange-400") {{ o.id }}
						td(class="py-2 px-4") {{ o.user }}
						td(class="py-2 px-4") {{ o.total }}
						td(class="py-2 px-4") {{ o.status }}
						td(class="py-2 px-4") {{ new Date(o.date).toLocaleDateString() }}
</template>
