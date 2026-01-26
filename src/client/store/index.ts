import { acceptHMRUpdate, defineStore } from "pinia";

interface StateInterface {
    name: string;
    age: number;
}

// export const useOilStore = defineStore<'oilStore', OilStoreState>('oilStore', {
export const STORE = defineStore("oilStore", {
    state: (): StateInterface => ({
        name: "Ecome",
        age: 26,
    }),
    getters: {},
    actions: {},
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(STORE, import.meta.hot));
}
