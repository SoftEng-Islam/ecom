// src/client/store/cart.store.ts
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { getAuth } from 'firebase/auth';
import { cartService } from '../services/cart.service.ts';
import type { IUser, IProduct, ICart } from '@shared/types/index';
import { useToast } from 'vue-toastification';

import { ICartItem } from '@shared/types/user';

const toast = useToast();

interface StateInterface {
    items: ICartItem[];
    isLoading: boolean;
    error: string | null;
}

export const useCartStore = defineStore('cart', {
    state: (): StateInterface => ({
        items: [],
        isLoading: false,
        error: null,
    }),
    getters: {},
    actions: {
        async fetchCart() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                this.items = [];
                return;
            }

            try {
                this.isLoading = true;
                this.error = null;
                const token = await user.getIdToken();
                const cartItems = await cartService.getCart(token);
                this.items = Array.isArray(cartItems) ? cartItems : [];
            } catch (err) {
                console.error('Failed to fetch cart:', err);
                this.error = 'Failed to load your cart. Please try again.';
                this.items = [];
            } finally {
                this.isLoading = false;
            }
        },

        async addToCart(productId: string, quantity = 1) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                toast.warning('Please log in to add items to your cart');
                throw new Error('You must be logged in to add items to cart');
            }

            try {
                const token = await user.getIdToken();
                const updatedCart = await cartService.addToCart(productId, quantity, token);
                this.items = updatedCart;
                const addedItem = updatedCart.find((i: ICartItem) => i.productId === productId);
                toast.success(`Added ${addedItem?.product?.name || 'item'} to cart`);
                return addedItem;
            } catch (err: any) {
                console.error('Failed to add to cart:', err);
                toast.error(err.response?.data?.message || 'Failed to add to cart');
                throw err;
            }
        },

        async updateQuantity(productId: string, newQuantity: number) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                throw new Error('You must be logged in to update cart');
            }

            try {
                const token = await user.getIdToken();
                // Find current item to calculate delta or just reset?
                // Backend addToCart increments, so we might need a specific update endpoint or just use delta
                // For simplicity, let's assume updateQuantity replaces the total quantity if we had an update endpoint
                // But since we only have addToCart (which increments), let's just use it with quantity 1/-1 for incremental changes
                // Or better, let's add a proper update endpoint to backend later.
                // For now, let's just refresh the whole cart after any change.

                const item = this.items.find(i => i.productId === productId);
                if (!item) return;

                const delta = newQuantity - item.quantity;
                if (delta === 0) return;

                const updatedCart = await cartService.addToCart(productId, delta, token);
                this.items = updatedCart;
                toast.info('Cart updated');
            } catch (err) {
                console.error('Failed to update cart item:', err);
                toast.error('Failed to update quantity');
                throw err;
            }
        },

        async removeFromCart(productId: string) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                throw new Error('You must be logged in to remove items from cart');
            }

            try {
                const token = await user.getIdToken();
                const updatedCart = await cartService.removeFromCart(productId, token);
                this.items = updatedCart;
                toast.success('Removed from cart');
            } catch (err) {
                console.error('Failed to remove item from cart:', err);
                toast.error('Failed to remove item');
                throw err;
            }
        },
    },
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
