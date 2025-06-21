<script setup lang="ts">
import Button from '@/components/generics/Button.vue';

const props = defineProps<{
    currentView: string
}>();

const emit = defineEmits<{
    toggleView: [],
    deleteAll: [],
    addNewNote: []
}>();

</script>
<template>
<div class="notes-page-header">
    <Button menu class="toggle-view-btn" @click="emit('toggleView')"/>
    <input type="text" class="search-input" placeholder="Search notes..." />
    <Button plus class="add-btn" @click="emit('addNewNote')"/>
    <Button delete class="delete-btn" @click="emit('deleteAll')"/>
</div>
</template>
<style lang="scss" scoped>
@use "@/stylesheets/default.scss" as *;
.notes-page-header {
    flex: 0;
    padding: 8px 28px 0 28px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    gap: 8px;
}

.search-input {
    height: 36px;
    flex: 1;
    padding: 0 10px;
    border-radius: 5px;
    font-size: 14px;
    min-width: 0;
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
