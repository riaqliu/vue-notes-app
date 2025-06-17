<script setup lang="ts">

const emit = defineEmits<{
    click: void
}>()

</script>
<template>
<button @click="emit('click')">
    <img src="@/assets/icon/delete.svg" alt="Delete" class="delete-icon"/>
</button>
</template>
<style>

</style>