import { Orders, IOrder } from "../models/orders.model.ts";
import { Users } from "../models/users.model.ts";

export const createOrder = async (orderData: Partial<IOrder>) => {
    const order = await Orders.create(orderData);

    // Clear the user's cart after a successful order
    if (order) {
        await Users.findOneAndUpdate(
            { id: orderData.userId },
            { $set: { cartItems: [] } }
        );
    }

    return order;
};

export const getUserOrders = async (userId: string) => {
    return Orders.find({ userId }).sort({ createdAt: -1 }).lean();
};
