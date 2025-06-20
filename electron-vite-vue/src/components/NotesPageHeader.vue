<script setup lang="ts">
import Button from '@/components/generics/Button.vue';

const props = defineProps<{
    currentView: string
}>();

const emit = defineEmits<{
    toggleView: void,
}>();

</script>
<template>
<div class="notes-page-header">
    <Button menu class="toggle-view-btn" @click="emit('toggleView')"/>
    <Button delete class="delete-btn"/>
    <Button plus class="add-btn"/>
</div>
</template>
<style lang="scss" scoped>
@use "@/stylesheets/default.scss" as *;
.notes-page-header {
    width:100%;
    padding: 5px;
    padding-top: 12px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    gap: 8px;
}

.toggle-view-btn,
.delete-btn,
.add-btn {
    position: relative;
    width: 36px;
    height: 36px;
    border-width: 0;
    border-radius: 5px;
    transform: translateY(0);

    &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: 0 0 3px $shadow-teal;
        transition: transform 0.2s ease, background-color 0.2s;
    }
}

.toggle-view-btn {
    margin-left: 20px;
}
.delete-btn {
    ::v-deep(img) {
        position: absolute;
        width: 36px;
        height: 36px;
        top: 0;
        left: 0;
    }
}
.add-btn {
    ::v-deep(img) {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0.5rem;
        left: 0.5rem;
    }
}

</style>
