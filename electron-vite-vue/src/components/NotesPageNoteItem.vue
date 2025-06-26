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
const isFocused = ref<boolean>(false);
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
function onContentInput(event: Event) {
    const target = event.target as HTMLDivElement;
    textValue.value = target.innerText;
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
        <div
            class="note-title"
            contenteditable="true"
        > 
            <div
                class="note-placeholder"
                v-if="!textValue && !isFocused"
            >
                Note title here...
            </div>
        </div>
        <div
            class="note-input"
            contenteditable="true"
            @input="onContentInput"
            @keydown="handleKeyDown"
            v-focus="!isSearching"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
            <div
                class="note-placeholder"
                v-if="!textValue && !isFocused"
            >
                Type your note here...
            </div>
        </div>
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

    .note-input-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .note-placeholder {
        position: absolute;
        top: 5px;
        left: 5px;
        color: $text-gray;
        pointer-events: none;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        padding: 2px;
        opacity: 0.6;
        white-space: pre-wrap;
        user-select: none;
    }

    .note-input {
        position: relative;
        width: 100%;
        height: 100%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: justify;
        text-justify: inter-word;
        outline: none;
        background-color: transparent;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-y: auto;
        padding: 2px;

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
