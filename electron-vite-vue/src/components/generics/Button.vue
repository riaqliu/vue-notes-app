<script setup lang="ts">
defineProps<{
    delete?: boolean,
    expand?: boolean,
    minimize?: boolean,
    plus?: boolean,
    listMenu?: boolean,
    cardMenu?: boolean,
    light?: boolean,
    sortUp?: boolean,
    sortDown?: boolean,
    sortByAlphabet?: boolean,
}>()

const emit = defineEmits<{
    click: []
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
        <img v-else-if="listMenu" src="@/assets/icon/hamburger-list-menu-black.svg" alt="List">
        <img v-else-if="cardMenu" src="@/assets/icon/card-layout.svg" alt="List">
        <img v-else-if="sortUp" src="@/assets/icon/sort-up-black.svg" alt="Sort Up">
        <img v-else-if="sortDown" src="@/assets/icon/sort-down-black.svg" alt="Sort Down">
        <img v-else-if="sortByAlphabet" src="@/assets/icon/sort-by-alphabet.svg" alt="Sort by Alphabet">
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