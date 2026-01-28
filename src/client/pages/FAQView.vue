<script setup lang="ts">
import { ref } from 'vue';

const faqs = ref([
    {
        q: 'How do I place an order?',
        a: 'Browse products, add them to your cart, and proceed to checkout.'
    },
    {
        q: 'What payment methods are accepted?',
        a: 'We accept credit cards, PayPal, and other secure payment options.'
    },
    {
        q: 'How can I track my order?',
        a: 'You can track your order status from your profile or order history.'
    },
    {
        q: 'Can I change or cancel my order?',
        a: 'Contact support as soon as possible to change or cancel your order.'
    },
    {
        q: 'Do you offer international shipping?',
        a: 'Currently, we ship within select regions. Check our shipping policy for details.'
    },
]);

const openIndex = ref(-1);
function toggleFAQ(idx: number) {
    openIndex.value = openIndex.value === idx ? -1 : idx;
}
</script>
<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col gap-6")
		h1(class="text-3xl font-bold text-white mb-2 font-outfit text-center") Frequently Asked Questions
		ul(class="flex flex-col gap-4")
			li(v-for="(faq, idx) in faqs" :key="faq.q" class="rounded-xl bg-zinc-900 border border-white/10 p-4 cursor-pointer transition-all" @click="toggleFAQ(idx)")
				div(class="flex items-center justify-between")
					span(class="text-lg font-semibold text-white") {{ faq.q }}
					span(class="text-orange-400 text-xl font-bold") {{ openIndex === idx ? '-' : '+' }}
				div(v-if="openIndex === idx" class="mt-2 text-zinc-300 text-sm") {{ faq.a }}
</template>
