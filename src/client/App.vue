<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./modules/layout/TheHeader.vue";
</script>

<template lang="pug">
	//- the-header
	router-view(class="p-5")
</template>
