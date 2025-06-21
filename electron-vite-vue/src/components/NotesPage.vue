<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import NotesPageNoteItem from '@/components/NotesPageNoteItem.vue';
import NotesPageHeader from '@/components/NotesPageHeader.vue';
import Button from '@/components/generics/Button.vue';

interface Note {
    uuid: number;
    textBody: string;
}
type ViewModeTypes = 'card' | 'list';

const notes = reactive<Note[]>([])
let nextId = 0;
const view = ref<ViewModeTypes>('card');
const expandedNote = ref<Note | null>(null);

const isToMinimizeButton = computed(() => {
    return notes.length > 0;
});
const isListView = computed(() => {
    return view.value === 'list';
});

function addNewNoteHandler() {
    const newNote = {
        uuid: ++nextId,
        textBody: ''
    }
    notes.push(newNote);
}
function editNoteHandler(uuid: number, newText: string) {
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
    const noteToExpand = notes.find((note) => note.uuid === uuid);
    if (noteToExpand) expandedNote.value = noteToExpand;
}
function minimizeNoteHandler(uuid: number) {
    expandedNote.value = null;
}
function toggleViewHandler() {
    if (view.value === 'card') view.value = 'list';
    else view.value = 'card';
}

</script>
<template>
    <div class="content">
        <Header/>
        <div class="page-content">
            <NotesPageHeader
                :current-view="view"
                @toggle-view="toggleViewHandler"
                @delete-all="notes.splice(0,notes.length)"
                @add-new-note="addNewNoteHandler"
            />
            <div class="body">
                <NotesPageNoteItem
                    v-for="(note, idx) in notes"
                    :class="{ expanded: note === expandedNote, list: isListView}"
                    class="item"
                    :key="idx"
                    :uuid="note.uuid"
                    :text-body="note.textBody"
                    :is-expanded="note === expandedNote"
                    @edit="editNoteHandler"
                    @delete="deleteNoteHandler"
                    @expand="expandNoteHandler"
                    @minimize="minimizeNoteHandler"
                />
                <Button
                    plus
                    :class="{ min: isToMinimizeButton }"
                    class="item btn"
                    @click="addNewNoteHandler"/>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "@/stylesheets/default.scss" as *;

.content, .page-content {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
    margin-bottom: 0;
}
.page-content {
    background-color: white;
}

.body {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    gap: 4px;
    height: 100%;
    padding: 10px 24px 20px 24px;
    overflow-y: auto;
}

.body::-webkit-scrollbar {
    width: 6px;
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
    width: 42vw;
    border-radius: 5px;
    border-width: 0;
    padding: 6px;
    margin: 0.5vw;

    &.expanded {
        order: -1;
        height: 50vh;
        width: 80rem;
        transition: height 0.4s, width 1.1s;

        ::v-deep(textarea) {
            height: 100%;
        }
    }

    &.btn {
        background-color: rgb(240, 240, 240);
        font-size: 48px;
        transform: translateY(0);
        transition: width 0;
        height: 186px;
        width: 44vw;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        transition: none;
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

    &.list {
        height: 20px;
        width: 80rem;
        transition: height 0.3s ease, width 1s ease;
        :deep(.note-options) {
            top: 0.2rem;
            right: 0.2rem;
            flex-direction: row;
        }
        &.expanded {
            order: unset;
            height: 50vh;
            cursor: pointer;
            transform: translateY(-2px);
            :deep(.note-options) {
                top: 0.5rem;
                right: 0.5rem;
                gap: 0.25rem;
                flex-direction: column;
            }
        }
    }
}

</style>
