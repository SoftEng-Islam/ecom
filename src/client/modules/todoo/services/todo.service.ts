import Http from "../../../Http.ts";

export interface Todo {
	_id: string;
	title: string;
	description?: string;
	completed: boolean;
	priority: "low" | "medium" | "high";
	dueDate?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTodoDto {
	title: string;
	description?: string;
	priority?: "low" | "medium" | "high";
	dueDate?: string;
}

export interface UpdateTodoDto {
	title?: string;
	description?: string;
	priority?: "low" | "medium" | "high";
	dueDate?: string;
	completed?: boolean;
}

class TodoService extends Http {
	private readonly baseUrl = "/api/todos";

	async getTodos(params?: { completed?: boolean; priority?: string }) {
		return this.get(this.baseUrl, { params });
	}

	async createTodo(data: CreateTodoDto) {
		return this.post(this.baseUrl, data);
	}

	async updateTodo(id: string, data: UpdateTodoDto) {
		return this.put(`${this.baseUrl}/${id}`, data);
	}

	async toggleTodo(id: string) {
		return this.patch(`${this.baseUrl}/${id}/toggle`, {});
	}

	async deleteTodo(id: string) {
		return this.delete(`${this.baseUrl}/${id}`);
	}
}

export const todoService = new TodoService();
