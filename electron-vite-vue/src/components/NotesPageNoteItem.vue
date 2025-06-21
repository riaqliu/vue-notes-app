<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from '@/components/generics/Button.vue';

const props = defineProps<{
    uuid: number,
    textBody?: string,
    isExpanded: boolean
}>()

const emit = defineEmits<{
    edit: [uuid: number, newText: string],
    delete: [uuid: number],
    expand: [uuid: number],
    minimize: [uuid: number]
}>()

const textValue = ref('');
const showPlaceholder = ref(true);

watch(() => props.textBody, (newVal) => {
    if (newVal !== undefined)
        textValue.value = newVal;
}, {immediate: true});

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
    emit('edit', props.uuid, textValue.value);
}

function deleteNote() {
    emit('delete', props.uuid);
}

function expandNote() {
    emit('expand', props.uuid);
}

function minimizeNote() {
    emit('minimize', props.uuid);
}


</script>
<template>
    <div
        class="note-content"
        v-click-outside="() => editNote()"
    >
        <textarea
            v-model="textValue"
            v-focus
            :placeholder="showPlaceholder ? 'Type your note here...' : ''"
            @keydown="handleKeyDown"
            @mouseenter="showPlaceholder = true"
            @mouseleave="showPlaceholder = false"
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
