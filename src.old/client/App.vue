<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./modules/lyeout/TheHeader.vue";
const Data = ref('');
const getData = async () => {
	try {

		// "https://api.github.com/users/softeng";
		const response = await fetch(`http://localhost:5001/hello`);
		const data = await response.json();

		if (response.ok) {
			Data.value = data;
			// error.value = null;
		} else {
			// userProfile.value = null;
			// error.value = `Error: ${data}`;
		}


	} catch (err) {
		console.error('Error fetching data:', err);
		// error.value = 'An error occurred while fetching data.';
	}
};
</script>

<template lang="pug">
	the-header
	router-view(class="p-5")
	//- button(type="button" class="p-1 px-2 bg-zinc-500 rounded-md" @click="getData") fetch
	//- h2 {{ Data.message }}
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
