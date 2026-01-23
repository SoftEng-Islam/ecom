<script setup lang="ts">
import { computed, onMounted } from 'vue';
import TheNavbar from "./TheNavbar.vue";
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { type User } from "firebase/auth";


const props = defineProps<{
	user: User;
}>();


const user = props.user;
// const userId: string = user.uid;

async function created() {
	const auth = getAuth();
	if (isSignInWithEmailLink(auth, window.location.href)) {
		const email = window.localStorage.getItem('emailForSignIn');
		if (email) await signInWithEmailLink(auth, email, window.location.href);
		alert("Successfully Signed in!");
		window.localStorage.removeItem('emailForSignIn');
	}
}
onMounted(created);


const isLoggedIn = computed(() => !!props.user && !!props.user.email);
const avatarUrl = computed(() => 'https://api.dicebear.com/7.x/identicon/svg?seed=' + (user?.email || 'Guest'));
</script>
<template lang="pug">
header(class="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl")
	div(class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6")
		router-link(to="/" class="flex items-center gap-2 group")
			div(class="size-8 rounded-lg bg-linear-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300")
				span(class="text-white font-bold text-lg font-outfit") H
			span(class="text-xl font-bold bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent font-outfit tracking-tight") HumHum

		nav
			ul(class="flex items-center gap-1")
				li
					router-link(
						to="/"
						class="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
						active-class="!text-orange-400 bg-orange-500/10"
					) Home
				li
					router-link(
						to="/cart"
						class="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-2"
						active-class="!text-orange-400 bg-orange-500/10"
					) Cart

		//- User Avatar or Login Button
		div(class="flex items-center gap-3 ml-4")
			div(v-if="isLoggedIn" class="flex items-center gap-2")
				img(:src="avatarUrl" alt="User Avatar" class="w-8 h-8 rounded-full border-2 border-orange-400/40 shadow-md bg-white/30")
				span(class="text-sm font-medium text-white") {{props.user.name || props.user.email}}
			div(v-else)
				router-link(to="/login" class="px-4 py-2 rounded-full bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-200 shadow-md") Login

the-navbar
</template>
<style scoped lang="css">
.font-outfit {
	font-family: 'Outfit', sans-serif;
}
</style>
