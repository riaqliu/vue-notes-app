<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import Button from '@/components/__generics__/Button.vue';

const props = defineProps({
    uuid: {
        type: Number,
        required: true
    },
    textBody: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: () => new Date()
    },
    isExpanded: Boolean,
    isSearching: {
        type: Boolean,
        default: false
    }
}
)

const emit = defineEmits<{
    edit: [object: { uuid: number; textBody: string }],
    delete: [],
    expand: [],
    minimize: []
}>()

const textValue = ref<string>('');
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
    emit('edit', { uuid: props.uuid, textBody: textValue.value });
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
            placeholder="Type your note here..."
            @keydown="handleKeyDown"
            v-focus="!isSearching"
        />
        <div class="note-options">
            <Button light delete class="note-btn delete" @click="emit('delete')"/>
            <Button v-if="isExpanded" minimize class="note-btn" @click="emit('minimize')"/>
            <Button v-else expand class="note-btn" @click="emit('expand')"/>
        </div>
        <span class="note-info">
            {{ props.dateCreated.toLocaleDateString() }} {{ props.dateCreated.toLocaleTimeString() }}
        </span>
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
        .note-info,
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

.note-info {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    font-size: 10px;
    color: $text-gray;
    opacity: 0;
    user-select: none;
    -webkit-user-drag: none;
}
</style>
