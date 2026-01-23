<script setup lang="ts">
const features = [
    {
        icon: '🍕',
        title: 'Diverse Menu',
        desc: 'From pizza to sushi, enjoy a wide variety of cuisines and dishes.'
    },
    {
        icon: '⚡',
        title: 'Fast Delivery',
        desc: 'Get your food delivered hot and fresh, right to your door.'
    },
    {
        icon: '💳',
        title: 'Secure Payments',
        desc: 'Multiple payment options with top-notch security.'
    },
    {
        icon: '🌱',
        title: 'Healthy Choices',
        desc: 'Plenty of vegetarian, vegan, and healthy options.'
    },
    {
        icon: '⭐',
        title: 'Top Rated',
        desc: 'Thousands of satisfied customers and 5-star reviews.'
    },
    {
        icon: '📱',
        title: 'Mobile Friendly',
        desc: 'Order easily from any device, anywhere, anytime.'
    }
];
</script>
<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col gap-10")
		h1(class="text-3xl font-bold text-white mb-2 font-outfit text-center") Features
		div(class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6")
			div(v-for="f in features" :key="f.title" class="flex flex-col items-center gap-3 bg-zinc-900 border border-white/10 rounded-xl p-6 text-center hover:border-orange-400/40 transition-all")
				span(class="text-4xl") {{ f.icon }}
				span(class="text-lg font-semibold text-white mt-2") {{ f.title }}
				span(class="text-zinc-400 text-sm mt-1") {{ f.desc }}
</template>
