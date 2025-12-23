import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
	title: { type: String, required: [true, "Title is required"] },
	context: { type: String, required: [true, "Contaxt is required"] },
});
