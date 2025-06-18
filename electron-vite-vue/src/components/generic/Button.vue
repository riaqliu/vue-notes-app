<script setup lang="ts">
const emit = defineEmits<{
    click: void
}>()

</script>
<template>
<button @click="emit('click')">
    <img src="@/assets/icon/delete-white.svg" alt="Delete" class="delete-icon"/>
</button>
</template>
<style lang="scss" scoped>
img {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>