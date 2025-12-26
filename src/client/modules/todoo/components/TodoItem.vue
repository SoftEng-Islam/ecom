<script setup lang="ts">
import { computed } from "vue";
import { type Todo } from "../services/todo.service";
// import { format } from "date-fns"; // Removed unused import
import { RiDeleteBinLine, RiCheckboxCircleLine, RiCheckboxBlankCircleLine, RiTimeLine } from "@remixicon/vue";

const props = defineProps<{
	todo: Todo;
}>();

const emit = defineEmits<{
	(e: "toggle", id: string): void;
	(e: "delete", id: string): void;
}>();

const priorityColor = computed(() => {
	switch (props.todo.priority) {
		case "high": return "text-red-400 bg-red-400/10 border-red-400/20";
		case "medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
		case "low": return "text-green-400 bg-green-400/10 border-green-400/20";
		default: return "text-gray-400";
	}
});

const formattedDate = computed(() => {
	if (!props.todo.dueDate) return null;
	return new Date(props.todo.dueDate).toLocaleDateString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
});
</script>

<template lang="pug">
div(
	class="group relative bg-gray-800/40 hover:bg-gray-800/60 backdrop-blur-sm border border-white/5 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5"
	:class="{ 'opacity-60': todo.completed }"
)
	div(class="flex items-start gap-4")
		// Checkbox
		button(
			@click="$emit('toggle', todo._id)"
			class="mt-1 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none"
		)
			RiCheckboxCircleLine(v-if="todo.completed" class="w-6 h-6 text-green-500")
			RiCheckboxBlankCircleLine(v-else class="w-6 h-6")

		// Content
		div(class="flex-1 min-w-0")
			div(class="flex items-center gap-3 mb-1")
				h3(
					class="font-medium text-lg text-white truncate transition-all"
					:class="{ 'line-through text-gray-500': todo.completed }"
				) {{ todo.title }}

				span(
					class="px-2 py-0.5 text-xs font-medium rounded-full border capitalize"
					:class="priorityColor"
				) {{ todo.priority }}

			p(
				v-if="todo.description"
				class="text-gray-400 text-sm mb-3 line-clamp-2"
			) {{ todo.description }}

			// Footer info
			div(class="flex items-center gap-4 text-xs text-gray-500")
				div(v-if="formattedDate" class="flex items-center gap-1")
					RiTimeLine(class="w-3.5 h-3.5")
					span {{ formattedDate }}

				// Actions that appear on hover
				div(class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2")
					button(
						@click="$emit('delete', todo._id)"
						class="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
						title="Delete task"
					)
						RiDeleteBinLine(class="w-4 h-4")

</template>
