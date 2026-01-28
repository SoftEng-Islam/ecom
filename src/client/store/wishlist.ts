import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

export const useWishlistStore = defineStore('wishlist', () => {
    const items = ref<string[]>([]);
    const toast = useToast();

    // Load from localStorage on init
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        try {
            items.value = JSON.parse(savedWishlist);
        } catch (e) {
            console.error('Failed to parse wishlist from localStorage');
            items.value = [];
        }
    }

    // Persist to localStorage whenever changed
    watch(items, (newItems) => {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
    }, { deep: true });

    function toggleWishlist(productId: string) {
        const index = items.value.indexOf(productId);
        if (index > -1) {
            items.value.splice(index, 1);
            toast.info('Removed from wishlist');
        } else {
            items.value.push(productId);
            toast.success('Added to wishlist');
        }
    }

    function isInWishlist(productId: string) {
        return items.value.includes(productId);
    }

    return {
        items,
        toggleWishlist,
        isInWishlist
    };
});
