<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import NotesPageNoteItem from '@/components/NotesPageNoteItem.vue';
import Button from '@/components/generic/Button.vue';

interface Note {
    uuid: number;
    textBody: string;
}
type ViewModeTypes = 'list' | 'expanded';

const notes = reactive<Note[]>([])
const cnt = ref<number>(0);
const view = ref<ViewModeTypes>('list');
const expandedNote = ref<Note>(null);

const minimizeButton = computed(() => {
    return notes.length > 0;
})
const isExpanded = computed(() => {
    return view === 'expanded';
})
const filteredNotes = computed(() => {
    if (isExpanded.value)
        return notes.findIndex(
            (note) => note.uuid === expandedNotes.value
        );
    return notes;
})

function clickHandler() {
    cnt.value++;
    notes.push(
        {
            uuid: cnt.value,
            textBody: ''
        }
    )
}
function createNoteHandler(uuid: number, newText: string) {
    const updatedNote = notes.find((note) => note.uuid === uuid);
    if (updatedNote) updatedNote.textBody = newText;
}
function deleteNoteHandler(uuid: number) {
    const idx = notes.findIndex((note) => note.uuid === uuid);
    if (idx !== -1) {
        notes.splice(idx, 1);
    }
}
function expandNoteHandler(uuid: number) {
    view.value = 'expanded';
    console.log(uuid, view.value);
}
</script>
<template>
    <div class="content">
        <Header/>
        <div class="body">
            <NotesPageNoteItem
                class="item"
                v-for="note in notes"
                :uuid="note.uuid"
                :text-body="note.textBody"
                @create="createNoteHandler"
                @delete="deleteNoteHandler"
                @expand="expandNoteHandler"
            />
            <Button
                plus
                :class="{ min: minimizeButton }"
                class="item btn"
                @click="clickHandler"/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "@/stylesheets/default.scss" as *;

.content {
    margin-bottom: 0;
    height: 100%;
}

.body {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    gap: 4px;

    padding: 20px 24px;
    background-color: white;
    height: 100%;

    overflow-y: auto;
}

.body::-webkit-scrollbar {
    width: 2px;
}

.body::-webkit-scrollbar-track {
    background: transparent;
}

.body::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background-clip: content-box;
}

.item {
    height: 165px;
    width: 40vw;
    border-radius: 5px;
    border-width: 0;
    padding: 12px;
    margin: 4px;

    &.btn {
        background-color: rgb(240, 240, 240);
        font-size: 48px;
        transform: translateY(0);
        transition: width 0.15s ease;
        height: 186px;
        width: 44vw;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        &:hover {
            width: 44vw;
            cursor: pointer;
            transform: translateY(-2px);
            transition: width 0.3s ease, transform 0.2s, background-color 0.3s;
        }
        :deep(img) {
            height: 20px;
            width: 20px; // Maintain aspect ratio
        }
    }

    &.min {
        background-color: rgb(240, 240, 240);
        width: 26px;
        font-size: 24px;
        transform: translateY(0);
        &:hover {
            background-color: $light-teal;
            transform: translateY(0) ;
            transition: width 0.3s ease, transform 0.2s, background-color 0.3s;
        }
        :deep(img) {
            height: 20px;
            width: 20px; // Maintain aspect ratio
        }
    }
}

</style>
