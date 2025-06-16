<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    uuid: number,
    textBody?: string
}>()

const emit = defineEmits<{
    create: [uuid: number, newText: string]
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

</script>
<template>
    <textarea
        v-if="isEditing"
        id="text"
        v-model="textValue"
        @keydown="handleKeyDown"
    />
    <div v-else>
        {{ textBody }}
    </div>
</template>
<style lang="scss" scoped>
#text {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    resize: none;
}
</style>