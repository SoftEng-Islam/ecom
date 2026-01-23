<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { type User } from "firebase/auth";
import TheHeader from "./layout/header/IndexApp.vue";
import LeftSidebar from "./layout/left-sidebar/LeftSidebar.vue";
import RightSidebar from "./layout/right-sidebar/RightSidebar.vue";
const user = ref<User | null>(null);

async function created() {
	const auth = getAuth();
	onAuthStateChanged(auth, u => {
		user.value = u;
	});
}

onMounted(created);
</script>

<template lang="pug">
div(class="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex flex-col")
	the-header
	main(class="flex-1 w-full max-w-7xl mx-auto p-6")
		//- Left Sidebar could go here in the future
		left-sidebar

		//- Main Content Area
		router-view(:user="user")

		//- Right Sidebar could go here in the future
		right-sidebar

</template>

<style>
body {
	font-family: 'Inter', sans-serif;
	background-color: #09090b;
	/* zinc-950 */
}
</style>
