import { Request, Response } from "express";
import * as ordersService from "../services/orders.service.ts";

interface AuthRequest extends Request {
    user?: {
        uid: string;
        email?: string;
    };
}

export const createOrderHandler = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.uid;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
        const orderData = {
            ...req.body,
            userId,
        };
        const order = await ordersService.createOrder(orderData);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserOrdersHandler = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.uid;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const orders = await ordersService.getUserOrders(userId);
    res.json(orders);
};
