import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { todoService, type Todo, type CreateTodoDto, type UpdateTodoDto } from "../services/todo.service.ts";
import { useToast } from "vue-toastification";

export const useTodoStore = defineStore("todo", () => {
	const todos = ref<Todo[]>([]);
	const isLoading = ref(false);
	const toast = useToast();

	const activeTodos = computed(() => todos.value.filter((t) => !t.completed));
	const completedTodos = computed(() => todos.value.filter((t) => t.completed));

	const fetchTodos = async (params?: { completed?: boolean; priority?: string }) => {
		isLoading.value = true;
		try {
			todos.value = await todoService.getTodos(params);
		} catch (error) {
			toast.error("Failed to fetch todos");
			console.error(error);
		} finally {
			isLoading.value = false;
		}
	};

	const addTodo = async (data: CreateTodoDto) => {
		try {
			const newTodo = await todoService.createTodo(data);
			todos.value.unshift(newTodo);
			toast.success("Todo added successfully");
		} catch (error) {
			toast.error("Failed to add todo");
			console.error(error);
		}
	};

	const updateTodo = async (id: string, data: UpdateTodoDto) => {
		try {
			const updatedTodo = await todoService.updateTodo(id, data);
			const index = todos.value.findIndex((t) => t._id === id);
			if (index !== -1) {
				todos.value[index] = updatedTodo;
			}
			toast.success("Todo updated successfully");
		} catch (error) {
			toast.error("Failed to update todo");
			console.error(error);
		}
	};

	const toggleTodo = async (id: string) => {
		try {
			const updatedTodo = await todoService.toggleTodo(id);
			const index = todos.value.findIndex((t) => t._id === id);
			if (index !== -1) {
				todos.value[index] = updatedTodo;
			}
		} catch (error) {
			toast.error("Failed to toggle todo");
			console.error(error);
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			await todoService.deleteTodo(id);
			todos.value = todos.value.filter((t) => t._id !== id);
			toast.success("Todo deleted successfully");
		} catch (error) {
			toast.error("Failed to delete todo");
			console.error(error);
		}
	};

	return {
		todos,
		isLoading,
		activeTodos,
		completedTodos,
		fetchTodos,
		addTodo,
		updateTodo,
		toggleTodo,
		deleteTodo,
	};
});
