import type { Directive } from 'vue'

const clickOutside: Directive = {
	mounted(el, binding) {
		const handler = (event: MouseEvent) => {
			if (!el.contains(event.target as Node)) {
				binding.value(event)
			}
		}
		document.addEventListener('click', handler)
		el._clickOutsideHandler = handler // save handler to remove later
	},
	unmounted(el) {
		document.removeEventListener('click', el._clickOutsideHandler)
	},
}

export default clickOutside
