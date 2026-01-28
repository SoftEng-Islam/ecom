<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Help & Support</h1>
        <p class="text-xl text-gray-600">How can we help you today?</p>
      </div>

      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <!-- Chat Container -->
        <div class="h-96 overflow-y-auto p-6 space-y-4" ref="chatContainer">
          <div v-for="(message, index) in messages" :key="index"
               :class="['flex', message.sender === 'user' ? 'justify-end' : 'justify-start']">
            <div :class="['max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none']">
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="border-t border-gray-200 p-4 bg-gray-50">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :disabled="isLoading"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim() || isLoading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">Send</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white p-4 rounded-lg shadow">
            <button
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center text-left"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <svg
                :class="['w-5 h-5 transform transition-transform',
                        activeFaqIndex === index ? 'rotate-180' : '']"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="activeFaqIndex === index"
              class="mt-2 text-gray-600"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, nextTick, onMounted } from 'vue';

export default {
  name: 'HelpChatView',
  setup() {
    const messages = ref([
      { text: 'Hello! How can I help you today?', sender: 'bot' },
    ]);
    const newMessage = ref('');
    const isLoading = ref(false);
    const chatContainer = ref<HTMLElement | null>(null);
    const activeFaqIndex = ref<number | null>(null);

    const faqs = [
      {
        question: 'How do I track my order?',
        answer: 'You can track your order by logging into your account and visiting the <strong>Order History</strong> section. You\'ll find tracking information once your order has been shipped.'
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy. Items must be unused, in their original packaging, and with all tags attached. Please contact our support team to initiate a return.'
      },
      {
        question: 'How can I contact customer service?',
        answer: 'You can reach our customer service team by email at <strong>support@example.com</strong> or by phone at <strong>1-800-123-4567</strong>. Our team is available Monday to Friday, 9 AM to 6 PM EST.'
      },
      {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination. You can view the shipping options at checkout.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.'
      }
    ];

    const scrollToBottom = () => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    };

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      const userMessage = newMessage.value;
      messages.value.push({ text: userMessage, sender: 'user' });
      newMessage.value = '';

      await nextTick();
      scrollToBottom();

      // Simulate bot response
      isLoading.value = true;
      setTimeout(() => {
        const botResponses = [
          'I understand you\'re asking about: ' + userMessage,
          'Thanks for your question! A customer service representative will get back to you shortly.',
          'I\'ve noted your concern. Is there anything else I can help you with?',
          'For immediate assistance, please call our support line at 1-800-123-4567.'
        ];
        const response = botResponses[Math.floor(Math.random() * botResponses.length)];
        messages.value.push({ text: response, sender: 'bot' });
        isLoading.value = false;
        scrollToBottom();
      }, 1000);
    };

    const toggleFaq = (index: number) => {
      activeFaqIndex.value = activeFaqIndex.value === index ? null : index;
    };

    onMounted(() => {
      scrollToBottom();
    });

    return {
      messages,
      newMessage,
      isLoading,
      chatContainer,
      faqs,
      activeFaqIndex,
      sendMessage,
      toggleFaq
    };
  }
};
</script>

<style scoped>
/* Custom scrollbar for chat container */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
