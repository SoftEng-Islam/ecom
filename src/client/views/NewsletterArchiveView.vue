<script setup lang="ts">
import { ref, onMounted } from 'vue';

const newsletters = ref([
    {
        title: 'Welcome to HumHum!',
        date: '2024-06-01',
        link: '#',
        summary: 'Our first newsletter! Discover what’s new and trending on HumHum.'
    },
    {
        title: 'Summer Specials',
        date: '2024-06-15',
        link: '#',
        summary: 'Check out our summer menu and exclusive offers.'
    },
    {
        title: 'Tips for Foodies',
        date: '2024-07-01',
        link: '#',
        summary: 'Get the best out of your HumHum experience with these tips.'
    }
]);
</script>
<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col gap-6")
		h1(class="text-3xl font-bold text-white mb-2 font-outfit text-center") Newsletter Archive
		ul(class="flex flex-col gap-4")
			li(v-for="n in newsletters" :key="n.title" class="rounded-xl bg-zinc-900 border border-white/10 p-4 flex flex-col gap-1")
				div(class="flex justify-between items-center")
					span(class="text-lg font-semibold text-orange-400") {{ n.title }}
					span(class="text-xs text-zinc-400") {{ new Date(n.date).toLocaleDateString() }}
				p(class="text-zinc-300 text-sm mt-1") {{ n.summary }}
				a(:href="n.link" class="text-orange-400 text-xs hover:underline mt-1" target="_blank") Read More
</template>
