<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const email = ref('');
const loading = ref(false);
const message = ref('');

async function SignIn() {
	if (!email.value) {
		message.value = 'Please enter your email.';
		return;
	}
	loading.value = true;
	const auth = getAuth();
	const actionCodeSettings = {
		url: window.location.origin + '/login',
		handleCodeInApp: true,
	};
	try {
		await sendSignInLinkToEmail(auth, email.value, actionCodeSettings);
		message.value = 'A login link was sent to your email.';
		window.localStorage.setItem('emailForSignIn', email.value);
	} catch (err) {
		message.value = 'Failed to send login link.';
	} finally {
		loading.value = false;
	}
}

const auth = getAuth();
if (isSignInWithEmailLink(auth, window.location.href)) {
	const storedEmail = window.localStorage.getItem('emailForSignIn');
	if (storedEmail) {
		signInWithEmailLink(auth, storedEmail, window.location.href).then(() => {
			message.value = 'Successfully Signed in!';
			window.localStorage.removeItem('emailForSignIn');
		});
	}
}
</script>

<template lang="pug">
div(class="min-h-screen flex items-center justify-center bg-zinc-950")
	div(class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col gap-6")
		h2(class="text-2xl font-bold text-white mb-2 text-center") Login
		form(@submit.prevent="SignIn" class="flex flex-col gap-4")
			input(type="email" v-model="email" placeholder="Enter your email" class="px-4 py-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-base")
			button(type="submit" :disabled="loading" class="px-4 py-3 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed")
				span(v-if="!loading") Send Login Link
				span(v-else) Sending...
		div(class="text-sm text-orange-400 mt-2 text-center") {{message}}
</template>
