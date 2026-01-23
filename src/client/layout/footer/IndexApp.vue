<script setup lang="ts">
// No logic for now, just UI
</script>
<template lang="pug">
footer(class="w-full bg-zinc-950/90 border-t border-white/10 backdrop-blur-xl mt-16")
	div(class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8")
		//- Left: Logo & Copyright
		div(class="flex flex-col items-center md:items-start gap-2")
			div(class="flex items-center gap-2")
				span(class="text-2xl font-bold text-orange-400 font-outfit") HumHum
				span(class="text-xs text-zinc-400") &copy; {{ new Date().getFullYear() }} All rights reserved.
		//- Center: Navigation Links
		nav(class="flex gap-6 text-sm font-medium text-zinc-400")
			a(href="/" class="hover:text-orange-400 transition-colors duration-200") Home
			a(href="/trending" class="hover:text-orange-400 transition-colors duration-200") Trending
			a(href="/categories" class="hover:text-orange-400 transition-colors duration-200") Categories
			a(href="/about" class="hover:text-orange-400 transition-colors duration-200") About
			a(href="/contact" class="hover:text-orange-400 transition-colors duration-200") Contact
		//- Right: Social Links
		div(class="flex gap-4")
			a(href="https://twitter.com" target="_blank" rel="noopener" class="text-zinc-400 hover:text-orange-400 transition-colors duration-200")
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
					path(stroke-linecap="round" stroke-linejoin="round" d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.637 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.977A4.107 4.107 0 0016.616 4c-2.266 0-4.104 1.828-4.104 4.084 0 .32.036.634.105.934C8.728 8.87 5.8 7.13 3.785 4.671a4.073 4.073 0 00-.555 2.052c0 1.42.726 2.675 1.825 3.411a4.093 4.093 0 01-1.858-.512v.052c0 1.984 1.417 3.637 3.292 4.017a4.1 4.1 0 01-1.853.07c.522 1.623 2.037 2.805 3.833 2.836A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84")
			a(href="https://github.com" target="_blank" rel="noopener" class="text-zinc-400 hover:text-orange-400 transition-colors duration-200")
				svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
					path(stroke-linecap="round" stroke-linejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.091-.646.35-1.087.636-1.338-2.221-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.135 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z")
</template>
