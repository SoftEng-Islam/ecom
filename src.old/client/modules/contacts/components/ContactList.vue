<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { VueSpinner } from 'vue3-spinners';
const apiURL = `${import.meta.env.VITE_API_URL}/contacts`;
const contacts = ref([]);
const loading = ref(true);

import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();


import { useToast } from "vue-toastification";
const toast = useToast();

const getContacts = async () => {
	try {
		const response = await axios.get(apiURL);
		console.log(response.data);
		contacts.value = response.data;
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
};

const deleteContact = async (id: number) => {
	try {
		if (confirm('Are you sure you want to delete this contact?'));
		const response = await axios.delete(`${apiURL}/${id}`);
		console.log("Response from server: ", response);
		if (response.status === 200) {
			toast.success("Contact Deleted successfully!");
			getContacts();
		}
	} catch (error) {
		console.log(error);
	}
};

onMounted(() => {
	console.log('Contacts List');
	getContacts();
});
</script>
<template lang="pug">
div(class="container w-full flex items-center justify-center")
	vue-spinner(v-if="loading")
	ul(v-else="" class="flex flex-col w-full items-center justify-center gap-2 p-3")
		li(v-for="contact in contacts" :key="index" class="w-full bg-zinc-400 p-3 rounded-md flex items-center justify-between gap-2")
			span(class="name") {{contact.name}}
			span(class="email") {{contact.email}}
			span(class="phone") {{contact.phone}}
			div(class="flex flex-col gap-2 justify-center p-2 items-stretch")
				button(type="button" @click="deleteContact(contact._id)" class="cursor-pointer hover:opacity-50 py-1 px-2 rounded-md shadow text-white bg-pink-500") Delete
				router-link(:to="{name: 'EditContact', params: { id: contact._id }}" class="hover:opacity-50 py-1 px-2 rounded-md shadow text-white bg-yellow-500") Edit
</template>
