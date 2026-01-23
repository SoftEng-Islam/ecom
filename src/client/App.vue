<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { type User } from "firebase/auth";
import TheHeader from "./layout/header/IndexApp.vue";
import LeftSidebar from "./layout/left-sidebar/LeftSidebar.vue";
import RightSidebar from "./layout/right-sidebar/RightSidebar.vue";
import TheFooter from "./layout/footer/IndexApp.vue";
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
	the-header(:user="user")
	main(class="flex flex-row w-full mx-auto p-6")
		//- Left Sidebar could go here in the future
		left-sidebar

		//- Main Content Area
		div(class="flex-1 mx-6")
			router-view(:user="user")

		//- Right Sidebar could go here in the future
		right-sidebar
	the-footer
</template>

<style>
body {
	font-family: 'Inter', sans-serif;
	background-color: #09090b;
	/* zinc-950 */
}
</style>
