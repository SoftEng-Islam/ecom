<script setup lang="ts">
const navColumns = [
	{
		title: 'Shop',
		links: [
			{ name: 'TrendingNow', path: '/trending' },
			{ name: 'New Arrivals', path: '/products' },
			{ name: 'Categories', path: '/categories' },
			{ name: 'Sale', path: '/products?sale=true' }
		]
	},
	{
		title: 'Support',
		links: [
			{ name: 'Help Center', path: '/help' },
			{ name: 'Track Order', path: '/profile' },
			{ name: 'Shipping Policy', path: '#' },
			{ name: 'Returns', path: '#' }
		]
	},
	{
		title: 'Company',
		links: [
			{ name: 'About Us', path: '/about' },
			{ name: 'Privacy Policy', path: '#' },
			{ name: 'Terms of Service', path: '#' },
			{ name: 'Contact', path: '/contact' }
		]
	}
];

const paymentIcons = [
	{ name: 'Visa', icon: 'M2 12h20M2 12s4-3.5 10-3.5 10 3.5 10 3.5M2 12s4 3.5 10 3.5 10-3.5 10-3.5' },
	{ name: 'Mastercard', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z' },
	{ name: 'PayPal', icon: 'M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4' }
];

function handleNewsletter() {
	alert('Thank you for subscribing! Check your email for a welcome gift.');
}
</script>
<template lang="pug">
footer(class="w-full bg-zinc-950 border-t border-white/5 pt-20 pb-10 mt-32")
  div(class="max-w-7xl mx-auto px-6")
    //- Top: Newsletter
    div(class="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900/40 rounded-[3rem] p-10 md:p-16 border border-white/5 mb-20")
      div
        h2(class="text-3xl md:text-4xl font-bold text-white mb-4 font-outfit") Join our inner circle
        p(class="text-zinc-400 text-lg") Subscribe to receive updates, access to exclusive deals, and more.
      form(@submit.prevent="handleNewsletter" class="flex flex-col sm:flex-row gap-4 items-center")
        input(type="email" placeholder="Enter your email" required class="w-full sm:flex-1 bg-zinc-800 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-orange-500 transition-colors")
        button(type="submit" class="w-full sm:w-auto px-10 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all") Subscribe

    //- Middle: Navigation
    div(class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20")
      div(class="col-span-2 md:col-span-1")
        router-link(to="/" class="text-3xl font-bold text-white font-outfit mb-6 block")
          | Hum
          span(class="text-orange-500") Hum
        p(class="text-zinc-500 text-sm leading-relaxed max-w-xs")
          | Elevating the e-commerce experience with premium products and seamless technology.

      div(v-for="col in navColumns" :key="col.title")
        h3(class="text-white font-bold mb-6") {{ col.title }}
        ul(class="space-y-4")
          li(v-for="link in col.links" :key="link.name")
            router-link(:to="link.path" class="text-zinc-400 hover:text-orange-500 transition-colors text-sm") {{ link.name }}

    //- Bottom: Social & Legal
    div(class="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8")
      div(class="flex gap-4 items-center")
        span(class="text-zinc-500 text-sm") &copy; {{ new Date().getFullYear() }} HumHum. All rights reserved.
        div(class="hidden md:block h-4 w-px bg-zinc-800")
        div(class="flex gap-4")
          a(href="#" class="text-zinc-500 hover:text-white text-xs transition-colors") Terms
          a(href="#" class="text-zinc-500 hover:text-white text-xs transition-colors") Privacy

      //- Payment Icons Simulation
      div(class="flex gap-6 items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500")
        svg(v-for="p in paymentIcons" :key="p.name" viewBox="0 0 24 24" fill="none" class="h-6 text-white" stroke="currentColor" stroke-width="1.5")
          path(stroke-linecap="round" stroke-linejoin="round" :d="p.icon")

      div(class="flex gap-6")
        a(href="#" class="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all")
          svg(xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2")
            path(d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z")
        a(href="#" class="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-white transition-all")
          svg(xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2")
            rect(x="2" y="2" width="20" height="20" rx="5" ry="5")
            path(d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z")
            line(x1="17.5" y1="6.5" x2="17.51" y2="6.5")
</template>
