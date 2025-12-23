import express from "express";
const contactRouter = express.Router();
import {
	getContacts,
	createContact,
	getContact,
	updateContact,
	deleteContact,
} from "../controllers/contactController.ts";

// Get Contacts
contactRouter.route("/").get(getContacts);
// Create Contact
contactRouter.route("/").post(createContact);
// Get Contact
contactRouter.route("/:id").get(getContact);

contactRouter.route("/:id").put(updateContact);

contactRouter.route("/:id").delete(deleteContact);

export default contactRouter;
