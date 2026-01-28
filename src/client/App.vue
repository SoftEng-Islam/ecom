<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "./modules/auth/auth.store";
import TheHeader from "./components/layout/TheHeader.vue";
import TheLeftSidebar from "./components/layout/TheLeftSidebar.vue";
import TheRightSidebar from "./components/layout/TheRightSidebar.vue";
import TheFooter from "./components/layout/TheFooter.vue";

const authStore = useAuthStore();

// Initialize auth state
onMounted(() => {
  authStore.initAuth();
});
</script>

<template lang="pug">
div(class="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex flex-col")
  the-header(:user="authStore.user")
  main(class="flex flex-row w-full mx-auto p-6 flex-1")
    //- Left Sidebar
    //- the-left-sidebar

    //- Main Content Area
    div(class="flex-1 mx-6")
      router-view

    //- Right Sidebar
    //- the-right-sidebar
  the-footer
</template>

<style scoped lang="sass">
/* Scoped styles if any */
</style>

<style lang="sass">
/* Global styles */
body
  font-family: 'Inter', sans-serif
  background-color: #09090b
</style>
