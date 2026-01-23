import { Request, Response } from "express";
import * as usersService from "../services/users.service.ts";

export const createUserHandler = async (req: Request, res: Response) => {
	const user = await usersService.createUser(req.body);
	res.status(201).json(user);
};

export const getUsersHandler = async (_req: Request, res: Response) => {
	const users = await usersService.getUsers();
	res.json(users);
};
