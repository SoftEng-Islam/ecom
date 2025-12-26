import mongoose from "mongoose";
const todoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			minlength: 1,
			maxlength: 100,
		},

		description: {
			type: String,
			trim: true,
			maxlength: 500,
		},

		completed: {
			type: Boolean,
			default: false,
			index: true,
		},

		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
			index: true,
		},

		dueDate: {
			type: Date,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	},
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
