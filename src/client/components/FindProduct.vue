<script setup lang="ts">
// Emits for parent to handle search, sort, and view changes
import { ref } from 'vue';

const emit = defineEmits(['update:view']);
const search = ref('');
const sort = ref('low');
const view = ref('grid');
const weight = ref('');
const weightUnit = ref('Gram');

function emitSearch() {
	// Emit search event
}
function emitSort() {
	// Emit sort event
}
function emitView(type: string) {
	view.value = type;
	emit('update:view', type);
}
</script>

<template lang="pug">
div(class="w-full flex flex-row items-center gap-4 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md shadow-md border border-white/10")
	//- [Left] Sort by
	div(class="flex items-center gap-2")
		label(for="sort" class="text-xs text-zinc-400 font-semibold mr-1") Sort by:
		select(id="sort" v-model="sort" @change="emitSort" class="bg-transparent text-xs font-bold text-zinc-500 outline-none pr-2 appearance-none cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300")
			option(value="low") Low Price First
			option(value="high") High Price First
			option(value="stars") Most Stars
			option(value="sales") Most Sales

	//- [Center] Search Box
	div(class="flex-1 flex justify-center")
		input(type="search" v-model="search" @input="emitSearch" placeholder="Looking for something..." class="w-full max-w-xs px-4 py-2 rounded-lg bg-zinc-900/60 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm shadow-inner")

	//- [Right] View switch: List || Grid
	div(class="flex items-center gap-3")
		button(@click="emitView('grid')" :class="['p-2 rounded-lg transition', view === 'grid' ? 'bg-orange-400 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700']" aria-label="Grid View")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
				path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75h4.5v4.5h-4.5v-4.5zm6 0h4.5v4.5h-4.5v-4.5zm6 0h4.5v4.5h-4.5v-4.5zm-12 6h4.5v4.5h-4.5v-4.5zm6 0h4.5v4.5h-4.5v-4.5zm6 0h4.5v4.5h-4.5v-4.5zm-12 6h4.5v4.5h-4.5v-4.5zm6 0h4.5v4.5h-4.5v-4.5zm6 0h4.5v4.5h-4.5v-4.5z")
		button(@click="emitView('list')" :class="['p-2 rounded-lg transition', view === 'list' ? 'bg-orange-400 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700']" aria-label="List View")
			svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
				path(stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16")
</template>
