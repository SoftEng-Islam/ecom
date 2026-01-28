<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../../modules/auth/auth.store';
import { useToast } from 'vue-toastification';

const props = defineProps<{
  productId: string;
}>();

const authStore = useAuthStore();
const toast = useToast();

const reviews = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);

const newReview = ref({
  rating: 5,
  comment: ''
});

async function fetchReviews() {
  try {
    const res = await axios.get(`/api/reviews/${props.productId}`);
    reviews.value = res.data;
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
  } finally {
    loading.value = false;
  }
}

async function submitReview() {
  if (!authStore.token) {
    toast.warning('Please sign in to leave a review');
    return;
  }

  submitting.value = true;
  try {
    const userName = authStore.firebaseUser?.displayName || authStore.firebaseUser?.email?.split('@')[0];
    await axios.post(`/api/reviews/${props.productId}`, {
      rating: newReview.value.rating,
      comment: newReview.value.comment,
      userName
    }, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });

    toast.success('Review submitted successfully!');
    newReview.value.comment = '';
    newReview.value.rating = 5;
    await fetchReviews();
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to submit review');
  } finally {
    submitting.value = false;
  }
}

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  return (reviews.value.reduce((acc, r) => acc + r.rating, 0) / reviews.value.length).toFixed(1);
});

onMounted(fetchReviews);
</script>

<template lang="pug">
div(class="space-y-12")
  div(class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6")
    div
      h2(class="text-3xl font-bold text-white font-outfit mb-2") Customer Reviews
      div(class="flex items-center gap-4")
        div(class="flex gap-1")
          svg(v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5" :class="i <= Number(averageRating) ? 'text-orange-500' : 'text-zinc-800'")
            path(fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd")
        span(class="text-zinc-400 font-medium") {{ averageRating }} based on {{ reviews.length }} reviews

    button(v-if="!submitting" @click="newReview.comment = ' '" class="px-6 py-3 bg-zinc-900 border border-white/10 text-white rounded-xl hover:bg-zinc-800 transition-colors text-sm font-bold uppercase tracking-wider") Write a Review

  //- Write Review Form
  div(v-if="newReview.comment !== undefined && authStore.token" class="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 space-y-6")
    div(class="flex items-center gap-4")
      span(class="text-zinc-400 text-sm font-bold uppercase tracking-widest") Your Rating:
      div(class="flex gap-2")
        button(v-for="i in 5" :key="i" @click="newReview.rating = i" class="transition-transform active:scale-95")
          svg(xmlns="http://www.w3.org/2000/svg" :viewBox="'0 0 24 24'" :fill="i <= newReview.rating ? 'currentColor' : 'none'" class="size-8 stroke-orange-500 stroke-1" :class="i <= newReview.rating ? 'text-orange-500' : 'text-zinc-600'")
            path(d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z")

    textarea(v-model="newReview.comment" placeholder="What did you think of this product?" rows="4" class="w-full bg-zinc-950 border border-white/10 rounded-2xl p-5 text-white focus:border-orange-500 outline-none transition-colors")

    div(class="flex justify-end gap-4")
      button(@click="newReview.comment = undefined" class="text-zinc-500 hover:text-white transition-colors text-sm font-bold") Cancel
      button(@click="submitReview" :disabled="submitting || !newReview.comment.trim()" class="px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all text-sm font-bold disabled:opacity-50")
        | {{ submitting ? 'Posting...' : 'Post Review' }}

  //- Review Feed
  div(v-if="loading" class="space-y-6")
    div(v-for="i in 3" :key="i" class="h-32 bg-zinc-900/30 rounded-3xl animate-pulse border border-white/5")

  div(v-else-if="reviews.length > 0" class="space-y-8")
    div(v-for="r in reviews" :key="r._id" class="border-b border-white/5 pb-8 last:border-0")
      div(class="flex justify-between items-start mb-4")
        div
          p(class="text-white font-bold text-lg mb-1") {{ r.userName }}
          p(class="text-zinc-550 text-xs uppercase tracking-widest") {{ new Date(r.createdAt).toLocaleDateString() }}
        div(class="flex gap-1")
          svg(v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="size-3" :class="i <= r.rating ? 'text-orange-500' : 'text-zinc-800'")
            path(d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z")
      p(class="text-zinc-300 leading-relaxed") {{ r.comment }}

  div(v-else class="text-center py-20 bg-zinc-900/20 rounded-[3rem] border border-white/5 dotted-bg")
    p(class="text-zinc-500") No reviews yet. Be the first to share your thoughts!
</template>

<style scoped>
.dotted-bg {
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
  background-size: 24px 24px;
}
</style>
