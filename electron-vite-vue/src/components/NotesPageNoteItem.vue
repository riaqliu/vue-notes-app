<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/generic/Button.vue';

const props = defineProps<{
    uuid: number,
    textBody?: string
}>()

const emit = defineEmits<{
    create: [uuid: number, newText: string],
    delete: [uuid: number]
}>()

const isEditing = ref(true);
const textValue = ref('');

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        if (!event.shiftKey) {
            event.preventDefault();
            createNote();
        }
    }
}

function createNote() {
    if (isEditing) {
        emit('create', props.uuid, textValue.value);
        isEditing.value = false;
    }
}

function deleteNote() {
    emit('delete', props.uuid);
}

</script>
<template>
    <div
        class="note-content"
        v-click-outside="() => createNote()"
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
            <Button expand class="note-btn"/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#text {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    resize: none;
}

.note-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: justify;
    text-justify: inter-word;
    white-space: pre-wrap;

    textarea {
        overflow: visible;
    }

    &:hover .note-btn {
        opacity: 1;
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
    transition: opacity 0.2s ease;

    &.delete {
        background-color: #f44336;
    }
}

#text {
    resize: none;
    width: 100%;
    height: 100%;
    border: 0;
    background-color: transparent;
}
</style>
