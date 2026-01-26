// src/client/services/cart.service.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const cartService = {
  async getCart(token: string) {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async addToCart(productId: string, quantity: number, token: string) {
    const response = await axios.post(
      `${API_URL}/cart/items`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  },

  async updateCartItem(
    itemId: string,
    data: { quantity: number },
    token: string,
  ) {
    const response = await axios.patch(
      `${API_URL}/cart/items/${itemId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  },

  async removeFromCart(itemId: string, token: string) {
    await axios.delete(`${API_URL}/cart/items/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
