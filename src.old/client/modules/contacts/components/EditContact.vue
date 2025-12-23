<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
const apiURL = `${import.meta.env.VITE_API_URL}/contacts`;
console.log("API URL is: ", apiURL);

const route = useRoute();
const router = useRouter();

import { useToast } from "vue-toastification";
const toast = useToast();

const contact = ref({
	name: "",
	email: "",
	phone: "",
});

// Use it!
// toast("I'm a toast!");
// or with options
// toast.success("My toast content", {
// 	timeout: 2000
// });

// These options will override the options defined in the "app.use" plugin registration for this specific toast
// const myMethod = () => {
// Since you returned `toast` from setup(), you can access it now
// toast.info("I'm an info toast!");
// };

const getContactById = async () => {
	try {
		const url = `${apiURL}/${route.params.id}`;
		const response = await axios.get(url);
		contact.value = response.data;
	} catch (error) {
		console.log(error);
	}
};

onMounted(() => {
	getContactById();
});

const saveContact = async () => {
	console.log("contact Values are: ", contact.value);
	if (!contact.value.name || !contact.value.email || !contact.value.phone) {
		toast.error("Please fill all the fields");
		return;
	}
	try {
		const response = await axios.put(`${apiURL}/${route.params.id}`, contact.value);
		console.log("Response from server: ", response.data);
		toast.success("Contact updated successfully!");
		// Clear the form
		contact.value = { name: "", email: "", phone: "" };
	} catch (error) {
		console.error("Error updating contact: ", error);
		toast.error("Failed to update contact Please try again.");
	};
};
</script>
<template lang="pug">
h3(class="bg") Edit Contact
div(class="container flex items-center justify-center")
	div(class="row")
		div(class="col")
			form(@submit.prevent="saveContact" class="flex flex-col gap-2")
				div(class="form-group")
					input(v-model="contact.name" type="text" name="" id="" class=" px-2 rounded-md form-control bg-amber-200" placeholder="Enter Name")
				div(class="form-group")
					input(v-model="contact.email" type="email" name="" id="" class=" px-2 rounded-md form-control bg-amber-200" placeholder="Enter Email")
				div(class="form-group")
					input(v-model="contact.phone" type="tel" name="" id="" class=" px-2 rounded-md form-control bg-amber-200" placeholder="Enter Phone")
				div(class="form-group")
					button(type="submit" class="py-1 px-2 rounded-md bg-green-800 text-white") Update
</template>
