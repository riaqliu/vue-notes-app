<script setup lang="ts">
import { reactive } from 'vue';

defineProps<{
    uuid?: number,
    textBody?: string
}>()

const isEditing = reactive<Boolean>(true);

</script>
<template>
    <input v-if="isEditing"/>
    <div v-else>
        {{ textBody }}
    </div>
</template>
<style lang="scss" scoped>
</style>