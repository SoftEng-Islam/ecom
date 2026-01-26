<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { type User } from "firebase/auth";
import TheNavbar from './TheNavbar.vue';
const props = defineProps<{
  user: User;
}>();

const router = useRouter();
const searchQuery = ref('');
const isMenuOpen = ref(false);
const isSearchFocused = ref(false);
const isUserMenuOpen = ref(false);
const isScrolled = ref(false);
const currentPath = ref('');

const user = props.user;
const isLoggedIn = computed(() => !!user && !!user.email);
const avatarUrl = computed(() => 'https://api.dicebear.com/7.x/identicon/svg?seed=' + (user?.email || 'Guest'));
const userName = computed(() => user?.displayName || user?.email?.split('@')[0] || 'User');

// Navigation items
const navItems = [
  { name: 'Home', path: '/', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
  { name: 'Shop', path: '/products', icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.937 2.937 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z' },
  { name: 'Categories', path: '/categories', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
  { name: 'Deals', path: '/deals', icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42' },
  { name: 'About', path: '/about', icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' },
];

// User menu items
const userMenuItems = [
  { name: 'Your Profile', path: '/profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  { name: 'Orders', path: '/orders', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
  { name: 'Wishlist', path: '/wishlist', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
];

// Handle search
const handleSearch = (e: Event) => {
  e.preventDefault();
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    searchQuery.value = '';
    isSearchFocused.value = false;
  }
};

// Handle scroll effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Close menus when clicking outside
const closeMenus = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.user-menu') && !target.closest('.user-avatar')) {
    isUserMenuOpen.value = false;
  }
  if (!target.closest('.search-container') && isSearchFocused.value) {
    isSearchFocused.value = false;
  }
};

// Logout function
const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    isUserMenuOpen.value = false;
    router.push('/');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Handle email link sign in
const handleEmailSignIn = async () => {
  const auth = getAuth();
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    if (email) {
      try {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        router.push('/');
      } catch (error) {
        console.error('Error signing in with email link:', error);
      }
    }
  }
};

// Watch route changes
watch(() => router.currentRoute.value.path, (newPath) => {
  currentPath.value = newPath;
  isMenuOpen.value = false;
  isUserMenuOpen.value = false;
  isSearchFocused.value = false;
});

// Lifecycle hooks
onMounted(() => {
  handleEmailSignIn();
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeMenus);
  currentPath.value = router.currentRoute.value.path;
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeMenus);
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{
    'bg-white/90 backdrop-blur-md shadow-sm': isScrolled || isSearchFocused,
    'bg-white': !isScrolled && !isSearchFocused
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center group" @click="isMenuOpen = false">
            <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300">
              <span class="text-white font-bold text-lg font-outfit">H</span>
            </div>
            <span class="ml-2 text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-outfit tracking-tight">
              HumHum
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <router-link v-for="item in navItems" :key="item.name" :to="item.path" class="px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200" :class="{
            'text-orange-600': currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)),
            'text-gray-700 hover:text-orange-600': currentPath !== item.path
          }">
            <svg class="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{
              'text-orange-600': currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)),
              'text-gray-500 group-hover:text-orange-600': currentPath !== item.path
            }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
            </svg>
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Right side controls -->
        <div class="flex items-center space-x-3">
          <!-- Search bar -->
          <div class="relative search-container">
            <div class="relative">
              <button @click="isSearchFocused = !isSearchFocused" class="p-2 rounded-full text-gray-600 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <!-- Expanded search input -->
              <div v-if="isSearchFocused" class="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 z-50" @click.stop>
                <form @submit="handleSearch" class="flex">
                  <input v-model="searchQuery" type="text" placeholder="Search products..." class="w-full px-4 py-3 text-sm text-gray-800 focus:outline-none" autofocus />
                  <button type="submit" class="px-4 text-gray-600 hover:text-orange-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Cart -->
          <router-link to="/cart" class="p-2 rounded-full text-gray-600 hover:text-orange-600 hover:bg-gray-100 relative transition-colors duration-200" :class="{ 'text-orange-600': currentPath === '/cart' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5.5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </router-link>

          <!-- User menu -->
          <div class="relative ml-2 user-menu">
            <button @click.stop="isUserMenuOpen = !isUserMenuOpen" class="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" id="user-menu" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <div v-if="isLoggedIn" class="user-avatar">
                <img :src="avatarUrl" :alt="userName" class="h-8 w-8 rounded-full border-2 border-orange-400/40 shadow-md">
              </div>
              <div v-else class="user-avatar">
                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </button>

            <!-- User dropdown menu -->
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <div v-show="isUserMenuOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" tabindex="-1">
                <div class="px-4 py-3" v-if="isLoggedIn">
                  <p class="text-sm text-gray-900 font-medium truncate">{{ userName }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
                </div>

                <div class="py-1" role="none">
                  <template v-if="isLoggedIn">
                    <router-link v-for="item in userMenuItems" :key="item.name" :to="item.path" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1" @click="isUserMenuOpen = false">
                      <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
                      </svg>
                      {{ item.name }}
                    </router-link>

                    <button @click="logout" class="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700" role="menuitem" tabindex="-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </template>

                  <template v-else>
                    <router-link to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1" @click="isUserMenuOpen = false">
                      Sign in
                    </router-link>
                    <router-link to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1" @click="isUserMenuOpen = false">
                      Create account
                    </router-link>
                  </template>
                </div>
              </div>
            </transition>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="isMenuOpen = !isMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500" aria-controls="mobile-menu" :aria-expanded="isMenuOpen">
              <span class="sr-only">Open main menu</span>
              <svg v-if="!isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div class="pt-2 pb-3 space-y-1">
        <router-link v-for="item in navItems" :key="item.name" :to="item.path" class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600" :class="{
          'bg-orange-50 text-orange-600': currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)),
          'text-gray-700 hover:text-orange-600': currentPath !== item.path
        }" @click="isMenuOpen = false">
          <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
          </svg>
          {{ item.name }}
        </router-link>

        <div class="border-t border-gray-200 pt-2 mt-2">
          <div v-if="isLoggedIn" class="px-4 py-3 flex items-center">
            <img :src="avatarUrl" :alt="userName" class="h-10 w-10 rounded-full border-2 border-orange-400/40 mr-3">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
              <p class="text-xs text-gray-500">{{ user.email }}</p>
            </div>
          </div>

          <div v-if="isLoggedIn" class="mt-2">
            <router-link v-for="item in userMenuItems" :key="'mobile-' + item.name" :to="item.path" class="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600" @click="isMenuOpen = false">
              <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
              </svg>
              {{ item.name }}
            </router-link>

            <button @click="logout" class="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>

          <div v-else class="px-4 py-3 space-y-2">
            <router-link to="/login" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" @click="isMenuOpen = false">
              Sign in
            </router-link>
            <p class="text-xs text-center text-gray-500 mt-2">
              New customer?
              <router-link to="/register" class="text-orange-600 hover:text-orange-500 font-medium" @click="isMenuOpen = false">
                Start here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Add padding to account for fixed header -->
  <div class="h-16"></div>
  <the-navbar />
</template>

<style scoped>
@reference "tailwindcss";

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

/* Smooth transitions for the header */
header {
  transition: all 0.3s ease-in-out;
  will-change: transform, background-color, box-shadow;
}

/* Better focus states for accessibility */
n a:focus,
button:focus {
  outline: none;
  @apply ring-2 ring-orange-500 ring-offset-2;
}

/* Custom scrollbar for dropdowns */
.dropdown-scroll {
  scrollbar-width: thin;
  scrollbar-color: #9ca3af #f3f4f6;
}

.dropdown-scroll::-webkit-scrollbar {
  width: 6px;
}

.dropdown-scroll::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.dropdown-scroll::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 3px;
}
</style>
