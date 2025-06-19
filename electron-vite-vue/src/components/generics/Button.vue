<script setup lang="ts">
const props = defineProps<{
    delete?: boolean,
    expand?: boolean,
    minimize?: boolean,
    plus?: boolean,
    menu?: boolean,
    light?: boolean
}>()

const emit = defineEmits<{
    click: void
}>()

</script>
<template>
<button @click.stop="emit('click')">
    <template v-if="light">
        <img v-if="delete" src="@/assets/icon/delete-white.svg" alt="Delete"/>
    </template>
    <template v-else>
        <img v-if="delete" src="@/assets/icon/delete-black.svg" alt="Delete"/>
        <img v-else-if="expand" src="@/assets/icon/expand-black.svg" alt="Expand">
        <img v-else-if="minimize" src="@/assets/icon/minimize-black.svg" alt="Minimize">
        <img v-else-if="plus" src="@/assets/icon/plus-black.svg" alt="Expand">
        <img v-else-if="menu" src="@/assets/icon/hamburger-list-menu-black.svg" alt="List">
    </template>
</button>
</template>
<style lang="scss" scoped>
    img {
        position: relative;
        width: 100%;
        height: 100%;
        user-select: none;
        -webkit-user-drag: none;
    }
</style>