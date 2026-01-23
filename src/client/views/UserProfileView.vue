<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.userId;
const user = ref<any>(null);
const loading = ref(true);

async function fetchUser() {
	try {
		const response = await axios.get(`/api/users/${userId}`);
		user.value = response.data;
	} finally {
		loading.value = false;
	}
}

onMounted(fetchUser);
</script>

<template lang="pug">
div(class="flex justify-center items-center min-h-[60vh]")
	div(v-if="loading" class="text-zinc-400 text-lg") Loading user profile...
	div(v-else-if="user" class="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col gap-6 items-center")
		img(:src="user.avatar || 'https://api.dicebear.com/7.x/identicon/svg?seed=Guest'" alt="User Avatar" class="w-24 h-24 rounded-full border-4 border-orange-400/30 shadow-md bg-white/30 mb-2")
		h2(class="text-2xl font-bold text-white mb-1") {{ user.name }}
		p(class="text-zinc-400 text-sm") {{ user.email }}
		div(class="flex flex-col gap-1 w-full mt-4")
			span(class="text-zinc-300 text-sm") Age: {{ user.age }}
			span(class="text-zinc-300 text-sm") Phone: {{ user.phone || 'N/A' }}
			span(class="text-zinc-300 text-sm") Role: {{ user.role }}
			span(class="text-zinc-300 text-sm") Address: {{ user.address ? user.address.street + ', ' + user.address.city + ', ' + user.address.state + ', ' + user.address.zipCode + ', ' + user.address.country : 'N/A' }}
		div(class="flex gap-4 mt-6")
			button(class="px-6 py-2 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-200 shadow-md") Edit Profile
			button(class="px-6 py-2 rounded-lg bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all duration-200 border border-white/10") Logout
	div(v-else class="text-zinc-400 text-lg") User not found.
</template>
