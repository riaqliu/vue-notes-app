<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { debounce } from 'lodash-es';
import Button from '@/components/__generics__/Button.vue';

const emit = defineEmits<{
    toggleView: [],
    deleteAll: [],
    addNewNote: [],
    searchQuery: [string],
    setIsSearching: [boolean]
}>();


type ViewModeTypes = 'card' | 'list';

const searchQuery = ref('');
const isFocused = ref(false);
const viewMode = ref<ViewModeTypes>('list');
const inputRef = ref<HTMLInputElement | null>(null);

const isListView = computed(() => viewMode.value === 'list');
const isCardView = computed(() => viewMode.value === 'card');

const debouncedSearch = debounce((query: string) => {
    emit('searchQuery', query);
}, 100);
function handleFocus() {
    isFocused.value = true;
}
function handleBlur() {
    isFocused.value = false;
}
function toggleView() {
    viewMode.value = viewMode.value === 'card' ? 'list' : 'card';
    emit('toggleView');
}

watch(isFocused, (focused) => {
    emit('setIsSearching', focused);
});
watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
}, { immediate: true });

</script>
<template>
<div class="notes-page-header">
    <Button
        :listMenu="isCardView"
        :cardMenu="isListView"
        class="toggle-view-btn"
        @click="toggleView"
    />
    <Button sortByAlphabet class="sort-btn"/>
    <input
        ref="inputRef"
        type="text"
        class="search-input"
        placeholder="Search notes..."
        v-model="searchQuery"
        @keyup.enter.prevent="($event.target as HTMLInputElement)?.blur()"
        @focus="handleFocus"
        @blur="handleBlur"
    />
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
.sort-btn,
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
.sort-btn {
    ::v-deep(img) {
        position: absolute;
        width: 36px;
        height: 36px;
        top: 0;
        left: 0;
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
