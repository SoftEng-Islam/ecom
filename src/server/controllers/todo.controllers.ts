import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Todo from "../models/todo.model.ts";

/**
 * @desc    Create a new todo
 * @route   POST /api/todos
 */
export const createTodo = asyncHandler(async (req: Request, res: Response) => {
	const { title, description, priority, dueDate } = req.body;
	if (!title) {
		res.status(400).json({ message: "Title is required" });
		return;
	}
	// This part will send a data to the mongoDB
	const todo = await Todo.create({ title, description, priority, dueDate });

	res.status(201).json(todo);
});

/**
 * @desc    Get all todos
 * @route   GET /api/todos
 */
export const getTodos = asyncHandler(async (req: Request, res: Response) => {
	const { completed, priority } = req.query;
	const filter: any = {};
	if (completed !== undefined) {
		filter.completed = completed === "true";
	}
	if (priority) {
		filter.priority = priority;
	}
	const todos = await Todo.find(filter).sort({ createdAt: -1 }).lean();
	res.status(200).json(todos);
});

/**
 * @desc    Get single todo by ID
 * @route   GET /api/todos/:id
 */
export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const todo = await Todo.findById(id);
	if (!todo) {
		res.status(404).json({ message: "Todo not found" });
		return;
	}
	res.status(200).json(todo);
});

/**
 * @desc    Update a todo
 * @route   PUT /api/todos/:id
 */
export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const todo = await Todo.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!todo) {
		res.status(404).json({ message: "Todo not found" });
		return;
	}

	// This will update the data inside the database
	res.status(200).json(todo);
});

/**
 * @desc    Toggle completed state
 * @route   PATCH /api/todos/:id/toggle
 */
export const toggleTodo = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const todo = await Todo.findById(id);

	if (!todo) {
		res.status(404).json({ message: "Todo not found" });
		return;
	}

	todo.completed = !todo.completed;
	await todo.save();

	res.status(200).json(todo);
});

/**
 * @desc    Delete a todo
 * @route   DELETE /api/todos/:id
 */
export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const todo = await Todo.findByIdAndDelete(id);

	if (!todo) {
		res.status(404).json({ message: "Todo not found" });
		return;
	}

	res.status(200).json({ message: "Todo deleted successfully" });
});
