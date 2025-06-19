<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from '@/components/generics/Button.vue';

const props = defineProps<{
    uuid: number,
    textBody?: string
}>()

const emit = defineEmits<{
    edit: [uuid: number, newText: string],
    delete: [uuid: number],
    expand: [uuid: number]
}>()

const isEditing = ref(true);
const textValue = ref('');

watch(() => props.textBody, (newVal) => {
    if (newVal !== undefined)
        textValue.value = newVal;
}, {immediate: true});

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        if (!event.shiftKey) {
            event.preventDefault();
            editNote();
        }
    }
}

function editNote() {
    if (isEditing.value) {
        emit('edit', props.uuid, textValue.value);
        isEditing.value = false;
    }
}

function deleteNote() {
    isEditing.value = false;
    emit('delete', props.uuid);
}

function expandNote() {
    isEditing.value = false;
    emit('expand', props.uuid);
}

</script>
<template>
    <div
        class="note-content"
        v-click-outside="() => editNote()"
        @click="isEditing=true"
    >
        <textarea
            v-if="isEditing"
            v-model="textValue"
            v-focus
            id="text"
            @keydown="handleKeyDown"
        />
        <div v-else>
            <p class="note-text">{{ textBody }}</p>
        </div>
        <div class="note-options">
            <Button delete class="note-btn delete" @click="deleteNote"/>
            <Button expand class="note-btn" @click="expandNote"/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "@/stylesheets/default.scss" as *;

.note-content {
    background-color: rgb(250, 250, 250);
    font-size: 12px;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: justify;
    text-justify: inter-word;
    white-space: pre-wrap;

    textarea {
        overflow: visible;
    }

    &:hover {
        box-shadow: 0 0 3px $shadow-teal;
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
    flex-direction: column; // Stack children vertically
    gap: 0.25rem; // Optional: space between buttons
}

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

    &.delete {
        background-color: #f44336;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 3px $shadow-teal;
        transition: transform 0.2s ease;
    }
}

#text {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: relative;
    resize: none;
    width: 100%;
    height: 95%;
    border-width: 0;
    margin: 0;
    padding: 0;
    outline: none; // Remove blue outline on focus
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
</style>
