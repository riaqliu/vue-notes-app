const clickOutsideMap = new WeakMap<HTMLElement, (e: MouseEvent) => void>();

export default {
    mounted(el: HTMLElement, binding: { value: () => void }) {
        const handler = (event: MouseEvent) => {
            if (!el.contains(event.target as Node)) {
                binding.value();
            }
        };
        clickOutsideMap.set(el, handler);
        document.addEventListener('mousedown', handler);
    },

    unmounted(el: HTMLElement) {
        const handler = clickOutsideMap.get(el);
        if (handler) {
            document.removeEventListener('mousedown', handler);
            clickOutsideMap.delete(el);
        }
    },
};
