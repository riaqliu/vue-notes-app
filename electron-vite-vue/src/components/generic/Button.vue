<script setup lang="ts">
const props = defineProps<{
    delete?: boolean,
    expand?: boolean,
    plus?: boolean
}>()

const emit = defineEmits<{
    click: void
}>()

</script>
<template>
<button @click="emit('click')">
    <img v-if="delete" src="@/assets/icon/delete-white.svg" alt="Delete"/>
    <img v-else-if="expand" src="@/assets/icon/expand-black.svg" alt="Expand">
    <img v-else-if="plus" src="@/assets/icon/plus-black.svg" alt="Expand">
</button>
</template>
<style lang="scss" scoped>
    img {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>