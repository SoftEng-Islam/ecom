import { Users, IUsers } from "../models/users.model.ts";

export const createUser = async (data: Pick<IUsers, "name" | "email" | "age">) => {
	return Users.create(data);
};

export const getUsers = async () => {
	// Why .lean()?
	// Returns plain JS objects
	// Faster
	// Better TypeScript inference
	return Users.find().lean();
};
