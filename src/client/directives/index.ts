import focus from './focus.ts';
import type { Directive } from 'vue';

const directives: Record<string, Directive> = {
    focus,
};

export default directives;
