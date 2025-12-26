<script setup lang="ts">
import { onMounted } from "vue";
import { useTodoStore } from "../store/todo.store";
import TodoItem from "./TodoItem.vue";
import { storeToRefs } from "pinia";

const store = useTodoStore();
const { activeTodos, completedTodos, isLoading } = storeToRefs(store);

onMounted(() => {
	store.fetchTodos();
});
</script>

<template lang="pug">
div(class="space-y-8")
	// Loading State
	div(v-if="isLoading && activeTodos.length === 0" class="flex justify-center py-12")
		div(class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500")

	// Empty State
	div(v-else-if="activeTodos.length === 0 && completedTodos.length === 0" class="text-center py-12 text-gray-500")
		p(class="text-lg") No tasks yet. Start by adding one!

	// Active Tasks
	div(v-if="activeTodos.length > 0" class="space-y-4")
		h3(class="text-lg font-semibold text-white/80 px-1 border-b border-white/10 pb-2") Active Tasks ({{ activeTodos.length }})
		div(class="grid gap-3")
			transition-group(name="list")
				todo-item(
					v-for="todo in activeTodos"
					:key="todo._id"
					:todo="todo"
					@toggle="store.toggleTodo"
					@delete="store.deleteTodo"
				)

	// Completed Tasks
	div(v-if="completedTodos.length > 0" class="space-y-4 opacity-75")
		h3(class="text-lg font-semibold text-white/80 px-1 border-b border-white/10 pb-2") Completed ({{ completedTodos.length }})
		div(class="grid gap-3")
			transition-group(name="list")
				todo-item(
					v-for="todo in completedTodos"
					:key="todo._id"
					:todo="todo"
					@toggle="store.toggleTodo"
					@delete="store.deleteTodo"
				)

</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so others can move smoothly */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
