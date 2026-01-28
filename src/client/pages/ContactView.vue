<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const sent = ref(false);
const loading = ref(false);

async function sendContact() {
    if (!name.value || !email.value || !message.value) return;
    loading.value = true;
    setTimeout(() => {
        sent.value = true;
        loading.value = false;
    }, 1200);
}
</script>
<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col gap-6")
		h1(class="text-3xl font-bold text-white mb-2 font-outfit text-center") Contact Us
		form(@submit.prevent="sendContact" class="flex flex-col gap-4")
			input(type="text" v-model="name" placeholder="Your Name" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			input(type="email" v-model="email" placeholder="Your Email" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			textarea(v-model="message" placeholder="Your Message" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base resize-none min-h-[80px]")
			button(type="submit" :disabled="loading || sent" class="px-4 py-3 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed")
				span(v-if="!loading && !sent") Send Message
				span(v-else-if="loading") Sending...
				span(v-else) Sent!
</template>
