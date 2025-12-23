import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.ts";
import { RequestHandler } from "express";

// @desc Get all contacts
// @route Get /api/contacts
// @access public
export const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find();
	res.status(200).json(contacts);
});
