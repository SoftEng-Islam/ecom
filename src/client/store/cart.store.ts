// src/client/store/cart.store.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { cartService } from "@client/services/cart.service";
import type { CartItem } from "@client/types/cart";
export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]); // Initialize as empty array
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const fetchCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      items.value = []; // Ensure it's always an array
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;
      const token = await user.getIdToken();
      const cartItems = await cartService.getCart(token);
      items.value = Array.isArray(cartItems) ? cartItems : []; // Ensure we have an array
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      error.value = "Failed to load your cart. Please try again.";
      items.value = []; // Reset to empty array on error
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You must be logged in to add items to cart");
    }

    try {
      const token = await user.getIdToken();
      const existingItem = items.value.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        throw new Error("Item is already in cart");
      }

      const newItem = await cartService.addToCart(productId, quantity, token);
      items.value.push(newItem);
      return newItem;
    } catch (err) {
      console.error("Failed to add to cart:", err);
      throw err;
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You must be logged in to update cart");
    }

    try {
      const token = await user.getIdToken();
      const item = items.value.find((item) => item.id === itemId);
      if (!item) return;

      const updatedItem = await cartService.updateCartItem(
        itemId,
        { quantity: newQuantity },
        token,
      );

      const index = items.value.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...updatedItem };
      }
    } catch (err) {
      console.error("Failed to update cart item:", err);
      throw err;
    }
  };

  const removeFromCart = async (itemId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You must be logged in to remove items from cart");
    }

    try {
      const token = await user.getIdToken();
      await cartService.removeFromCart(itemId, token);
      items.value = items.value.filter((item) => item.id !== itemId);
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
      throw err;
    }
  };

  return {
    items,
    isLoading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
});
