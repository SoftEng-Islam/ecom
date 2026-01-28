import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        name: '',
    }),
    getters: {},
    actions: {
        setUser(name: string, token: string) {
            this.name = name;
            this.token = token;
        },
        logout() {
            this.name = '';
            this.token = '';
        },
    },
    // persist: true,
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
