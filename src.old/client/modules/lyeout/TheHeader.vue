<script setup lang="ts"></script>
<template lang="pug">
header(class="flex items-center gap-2 px-5 bg-zinc-700 w-full h-20")
	span(class="text-xl text-green-500") Contacts-App
	ul(class="flex gap-2 mx-auto items-center text-white")
		li(class="bg-zinc-500 p-1 px-2 rounded-md")
			router-link(to="/") Home
		li(class="bg-zinc-500 p-1 px-2 rounded-md")
			router-link(to="/contacts") Contact-Page
		li(class="bg-zinc-500 p-1 px-2 rounded-md")
			router-link(to="/contact-list") Contact-List
		li(class="bg-zinc-500 p-1 px-2 rounded-md")
			router-link(to="/create-contact") Add-Contact

</template>
<style scoped lang="css"></style>
