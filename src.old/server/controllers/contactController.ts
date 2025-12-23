import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.ts";

// @desc Get all contacts
// @route GET /api/contacts
// @access public
export const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find();
	res.status(200).json(contacts);
});

// @desc Create new contacts
// @route POST /api/contacts
// @access public
export const createContact = asyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "All fields are required" });
		throw new Error("All fields are required");
	}
	const contact = await Contact.create({ name, email, phone });
	res.status(201).json(contact);
});

// @desc Get Single contact
// @route GET /api/contacts/:id
// @access public
export const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404).json({ message: "Contact not found" });
		throw new Error("Contact not found");
	}
	res.status(200).json(contact);
});
// @desc Update contacts
// @route PUT /api/contacts
// @access public
export const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json({ message: `Contact Updated for ${req.params.id}`, updatedContact });
});

// @desc Delete contacts
// @route DELETE /api/contacts
// @access public
export const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(404).json({ message: "Contact not found" });
		throw new Error("Contact not found");
	}
	await Contact.findByIdAndDelete(req.params.id);
	res.status(200).json({ message: `Contact Deleted for ${req.params.id}` });
});
