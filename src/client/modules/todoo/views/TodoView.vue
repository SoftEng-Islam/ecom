<script setup lang="ts">
import TodoForm from "../components/TodoForm.vue";
import TodoList from "../components/TodoList.vue";
</script>

<template lang="pug">
div(class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 md:p-8")
	div(class="max-w-4xl mx-auto")
		// Header
		header(class="mb-12 text-center")
			h1(class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 tracking-tight drop-shadow-sm") Cyber Todo
			p(class="text-gray-400 text-lg") Manage your tasks with futuristic efficiency.

		div(class="grid grid-cols-1 lg:grid-cols-12 gap-8")
			// Form Section (Sidebar on desktop)
			div(class="lg:col-span-5")
				div(class="lg:sticky lg:top-8")
					todo-form

			// List Section
			div(class="lg:col-span-7")
				todo-list
</template>
