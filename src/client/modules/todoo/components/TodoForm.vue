<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../store/todo.store";

const store = useTodoStore();
const title = ref("");
const description = ref("");
const priority = ref<"low" | "medium" | "high">("medium");
const dueDate = ref("");
const isSubmitting = ref(false);

const handleSubmit = async () => {
	if (!title.value) return;

	isSubmitting.value = true;
	await store.addTodo({
		title: title.value,
		description: description.value,
		priority: priority.value,
		dueDate: dueDate.value || undefined,
	});
	isSubmitting.value = false;

	// Reset form
	title.value = "";
	description.value = "";
	priority.value = "medium";
	dueDate.value = "";
};
</script>

<template lang="pug">
form(@submit.prevent="handleSubmit" class="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 transition-all hover:border-white/30")
	h2(class="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500") Add New Task

	div(class="space-y-4")
		// Title Input
		div
			label(class="block text-sm font-medium text-gray-300 mb-1") Title
			input(
				v-model="title"
				type="text"
				placeholder="What needs to be done?"
				class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
				required
			)

		// Description Input
		div
			label(class="block text-sm font-medium text-gray-300 mb-1") Description
			textarea(
				v-model="description"
				rows="3"
				placeholder="Add some details..."
				class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
			)

		div(class="grid grid-cols-1 md:grid-cols-2 gap-4")
			// Priority Select
			div
				label(class="block text-sm font-medium text-gray-300 mb-1") Priority
				select(
					v-model="priority"
					class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
				)
					option(value="low") Low Priority
					option(value="medium") Medium Priority
					option(value="high") High Priority

			// Due Date Input
			div
				label(class="block text-sm font-medium text-gray-300 mb-1") Due Date
				input(
					v-model="dueDate"
					type="datetime-local"
					class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all [color-scheme:dark]"
				)

		// Submit Button
		button(
			type="submit"
			:disabled="isSubmitting"
			class="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
		)
			span(v-if="isSubmitting") Adding...
			span(v-else) Add Task
</template>
