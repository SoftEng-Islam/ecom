// src/client/services/cart.service.ts
import axios from "axios";

// Use relative path for proxy or direct URL
const API_URL = "/api";

export const cartService = {
  async getCart(token: string) {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async addToCart(productId: string, quantity: number, token: string) {
    const response = await axios.post(
      `${API_URL}/cart`,
      { id: productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  },

  async removeFromCart(productId: string, token: string) {
    const response = await axios.delete(`${API_URL}/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
