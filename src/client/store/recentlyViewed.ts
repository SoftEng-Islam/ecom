import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useRecentlyViewedStore = defineStore('recentlyViewed', () => {
    const items = ref<string[]>([]);

    // Load from localStorage
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
        try {
            items.value = JSON.parse(saved);
        } catch (e) {
            items.value = [];
        }
    }

    watch(items, (newItems) => {
        localStorage.setItem('recentlyViewed', JSON.stringify(newItems));
    }, { deep: true });

    function trackView(productId: string) {
        // Remove if already exists to move it to the front
        const index = items.value.indexOf(productId);
        if (index > -1) {
            items.value.splice(index, 1);
        }

        // Add to front
        items.value.unshift(productId);

        // Keep only top 10
        if (items.value.length > 10) {
            items.value.pop();
        }
    }

    return {
        items,
        trackView
    };
});
