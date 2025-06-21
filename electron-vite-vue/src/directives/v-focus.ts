export default {
    mounted(el: HTMLElement, binding: { value: boolean}) {
        if (!binding.value) return;
        el.focus();
    }
};