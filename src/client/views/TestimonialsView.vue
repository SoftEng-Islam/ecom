<script setup lang="ts">
import { ref } from 'vue';

const testimonials = ref([
    {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=JohnDoe',
        review: 'HumHum has the best food delivery experience I have ever had! Fast, fresh, and delicious.',
        date: '2024-06-10'
    },
    {
        name: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=JaneSmith',
        review: 'Great variety and easy to use. I love the glassmorphic design!',
        date: '2024-06-12'
    },
    {
        name: 'Alice Johnson',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=AliceJohnson',
        review: 'Customer support was super helpful and my order arrived on time. Highly recommend!',
        date: '2024-06-15'
    }
]);
</script>
<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col gap-6")
		h1(class="text-3xl font-bold text-white mb-2 font-outfit text-center") Testimonials
		ul(class="flex flex-col gap-6")
			li(v-for="t in testimonials" :key="t.name + t.date" class="flex gap-4 items-start bg-zinc-900 border border-white/10 rounded-xl p-6")
				img(:src="t.avatar" :alt="t.name" class="w-14 h-14 rounded-full border-2 border-orange-400/30 shadow-md bg-white/30")
				div(class="flex-1")
					div(class="flex items-center gap-2 mb-1")
						span(class="text-lg font-semibold text-white") {{ t.name }}
						span(class="text-xs text-zinc-400") {{ new Date(t.date).toLocaleDateString() }}
					p(class="text-zinc-300 text-base mt-1") {{ t.review }}
</template>
