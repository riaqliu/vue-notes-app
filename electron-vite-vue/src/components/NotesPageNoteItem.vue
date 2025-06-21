<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import Button from '@/components/generics/Button.vue';

const props = defineProps({
    uuid: Number,
    textBody: {
        type: String,
        default: ''
    },
    isExpanded: Boolean,
    isSearching: {
        type: Boolean,
        default: false
    }
}
)

const emit = defineEmits<{
    edit: [uuid: Number, newText: String],
    delete: [uuid: Number],
    expand: [uuid: Number],
    minimize: [uuid: Number]
}>()

const textValue = ref('');
const showPlaceholder = ref<Boolean>(false);
const uuid = ref<Number>(props.uuid ?? 0);
const isExpanded = computed(() => props.isExpanded);
const isSearching = computed(() => props.isSearching);

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        if (!event.shiftKey) {
            event.preventDefault();
            editNote();
            (event.target as HTMLElement).blur();
        }
    }
}

function editNote() {
    emit('edit', uuid.value, textValue.value);
}

function deleteNote() {
    emit('delete', uuid.value);
}

function expandNote() {
    emit('expand', uuid.value);
}

function minimizeNote() {
    emit('minimize', uuid.value);
}

watch(() => props.textBody, (newText) => {
    textValue.value = newText;
}, { immediate: true });


</script>
<template>
    <div
        class="note-content"
        v-click-outside="() => editNote()"
    >
        <textarea
            v-model="textValue"
            :placeholder="showPlaceholder ? 'Type your note here...' : ''"
            @keydown="handleKeyDown"
            @mouseenter="showPlaceholder = true"
            @mouseleave="showPlaceholder = false"
            v-focus="!isSearching"
        />
        <div class="note-options">
            <Button light delete class="note-btn delete" @click="deleteNote"/>
            <Button v-if="isExpanded" minimize class="note-btn" @click="minimizeNote"/>
            <Button v-else expand class="note-btn" @click="expandNote"/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "@/stylesheets/default.scss" as *;

.note-content {
    background-color: rgb(230, 230, 230);
    font-size: 12px;
    position: relative;
    overflow: hidden;
    white-space: pre-wrap;
    padding: 5px;

    textarea {
        overflow: visible;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        position: relative;
        text-align: justify;
        text-justify: inter-word;
        resize: none;
        width: 100%;
        height: 100%;
        border-width: 0;
        outline: none;
        background-color: transparent;

        &::-webkit-scrollbar {
            width: 2px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            background-clip: content-box;
        }
    }

    &:hover {
        box-shadow: 0 0 6px $shadow-teal;
        .note-btn {
            opacity: 1;
        }
    }
}

.note-content::-webkit-scrollbar {
    width: 2px;
}

.note-content::-webkit-scrollbar-track {
    background: transparent;
}

.note-content::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background-clip: content-box;
}

.note-options {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .note-btn {
        width: 24px;
        height: 24px;
        padding: 0;
        border-width: 0;
        border-radius: 3px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(0);
        transition: opacity 0.2s ease;
        background-color: white;

        &.delete {
            background-color: red;
        }

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 0 3px $shadow-teal;
            transition: transform 0.2s ease;
        }
    }
}
</style>
