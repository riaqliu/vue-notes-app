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
    emit('create', props.uuid, textValue.value);
    isEditing.value = false;
}

function deleteNote() {
    emit('delete', props.uuid);
}

</script>
<template>
    <div
        class="note-content"
        v-click-outside="() => isEditing=false"
        @click="isEditing=true"
    >
        <textarea
            v-if="isEditing"
            v-model="textValue"
            v-focus
            id="text"
            @keydown="handleKeyDown"
        />
        <div v-else class="display-wrapper">
            <p class="note-text">{{ textBody }}</p>
            <Button @click="deleteNote"/>
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
    .display-wrapper {
        position: relative;
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
