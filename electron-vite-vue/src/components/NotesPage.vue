<script setup lang="ts">
import { reactive, ref, computed, nextTick } from 'vue';
import Header from '@/components/Header.vue';
import NotesPageNoteItem from '@/components/NotesPageNoteItem.vue';
import NotesPageHeader from '@/components/NotesPageHeader.vue';
import Button from '@/components/__generics__/Button.vue';

// TEST
// import { testPhrases } from '@/constants/testPhrases';

interface Note {
    uuid: number;
    textBody: string;
    created: Date;
}
type ViewModeTypes = 'card' | 'list';
type SortTypes = 'none' | 'ascending' | 'descending'

let nextId = 0;
const notes = reactive<Note[]>([]);
const view = ref<ViewModeTypes>('card');
const sortMode = ref<SortTypes>('none');
const expandedNote = ref<Note | null>(null);
const searchQuery = ref<string>('');
const isSearching = ref<boolean>(false);

const isToMinimizeButton = computed(() => {
    return notes.length > 0;
});
const isListView = computed(() => {
    return view.value === 'list';
});
const filteredNotes = computed(() => {
    return notes.filter(
        note => note.textBody.toLowerCase().trim().includes(searchQuery.value)
    ).sort((a,b) => {
        if (sortMode.value === 'ascending') {
            return a.created.getTime() > b.created.getTime() ? -1 : 1;
        }
        if (sortMode.value === 'descending') {
            return a.created.getTime() < b.created.getTime() ? -1 : 1;
        }
        return 0;
    });
});

function addNewNoteHandler() {
    notes.push({
        uuid: ++nextId,
        // textBody: `${nextId} ` + testPhrases[Math.floor(Math.random() * testPhrases.length)]
        textBody: '',
        created: new Date()
    });
}
function editNoteHandler({ uuid, textBody }: { uuid: number; textBody: string }) {
    const note = notes.find(note => note.uuid === uuid);
    if (note) {
        note.textBody = textBody;
    }
}
function deleteNoteHandler(uuid: number) {
    const index = notes.findIndex(note => note.uuid === uuid);
    if (index !== -1) {
        notes.splice(index, 1);
        if (expandedNote.value?.uuid === uuid) {
            expandedNote.value = null;
        }
    }
}
function expandNoteHandler(uuid: number) {
    const note = notes.find(note => note.uuid === uuid);
    if (note) {
        expandedNote.value = note;
        nextTick(() => {
            const itemElement = document.querySelector(`.item.expanded`);
            if (itemElement) {
                itemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}
function minimizeNoteHandler() {
    expandedNote.value = null;
}
function toggleViewHandler() {
    view.value = (view.value === 'card') ? 'list' : 'card';
}
function toggleSortHandler() {
    if(sortMode.value === 'none') sortMode.value = 'ascending';
    else if(sortMode.value === 'ascending') sortMode.value = 'descending';
    else if(sortMode.value === 'descending') sortMode.value = 'none';
}
function filterNotes(query: string) {
    searchQuery.value = query.toLowerCase().trim();
}

</script>
<template>
    <div class="content">
        <Header/>
        <div class="page-content">
            <NotesPageHeader
                @toggle-view="toggleViewHandler"
                @delete-all="notes.splice(0,notes.length)"
                @add-new-note="addNewNoteHandler"
                @search-query="filterNotes"
                @set-is-searching="isSearching = $event"
                @toggle-sort="toggleSortHandler"
            />
            <div class="body">
                <NotesPageNoteItem
                    v-for="note in filteredNotes"
                    :class="{ expanded: note === expandedNote, list: isListView}"
                    class="item"
                    :key="note.uuid"
                    :uuid="note.uuid"
                    :text-body="note.textBody"
                    :date-created="note.created"
                    :is-expanded="note === expandedNote"
                    :is-searching="isSearching"
                    @edit="editNoteHandler($event)"
                    @delete="deleteNoteHandler(note.uuid)"
                    @expand="expandNoteHandler(note.uuid)"
                    @minimize="minimizeNoteHandler"
                />
                <Button
                    plus
                    :class="{ min: isToMinimizeButton && !isListView, list: isListView }"
                    class="btn"
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

.item, .btn {
    border-radius: 5px;
    border-width: 0;
    padding: 6px;
    margin: 0.5vh 0.5vw;
    &.list {
        max-width: unset;
        margin: 0.2vh 0;
    }
}

.item {
    height: 165px;
    width: 45vw;
    max-width: 270px;

    &:hover{
        ::v-deep(.note-info) {
            transition: opacity 0.2s ease;
        }
    }
    &.expanded {
        height: 50vh;
        width: 100vw;
        max-width: unset;
        transition: height 0.4s, width 1.1s;

        ::v-deep(.note-info),
        ::v-deep(.note-btn) {
            opacity: 1;
        }
        ::v-deep(.note-input) {
            height: 100%;
        }
    }
    &.list {
        height: 20px;
        width: 100vw;
        display: flex;
        ::v-deep(.note-options) {
            top: 0.2rem;
            right: 0.2rem;
            flex-direction: row;
        }
        ::v-deep(.note-input) {
            height: 20px;
        }
        ::v-deep(.note-info) {
            opacity: 0;
        }
        &:hover {
            height: 40px;
            transition: height 0.2s ease;

            ::v-deep(.note-info) {
                opacity: 1;
                transition: opacity 0.4s ease;
            }
        }
        ::v-deep(.note-input) {
            overflow: hidden;
        }
        &.expanded {
            order: unset;
            height: 50vh;
            transform: translateY(-2px);
            ::v-deep(.note-options) {
                top: 0.5rem;
                right: 0.5rem;
                gap: 0.25rem;
                flex-direction: column;
            }
            ::v-deep(.note-info) {
                position: absolute;
                bottom: 0.5rem;
                left: 0.5rem;
                width: unset;
                padding-right: unset;
                display: unset;
                align-items: unset;
                opacity: 1;
            }
            ::v-deep(.note-input) {
                height: 100%;
            }
        }
    }
}

.btn {
    background-color: rgb(240, 240, 240);
    font-size: 48px;
    transform: translateY(0);
    transition: unset;
    height: 179px;
    width: 45vw;
    max-width: 298px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: none;
    &:hover {
        cursor: pointer;
        width: 45vw;
        transform: translateY(-2px);
        transition: width 0.5s ease, transform 0.2s, background-color 0.3s;
        background-color: $light-teal;
    }
    &.list {
        height: 30px;
        width: 100vw;
    }

    :deep(img) {
        height: 20px;
        width: 20px; // Maintain aspect ratio
    }
}

.min {
    background-color: rgb(240, 240, 240);
    width: 26px;
    font-size: 24px;
    transform: translateY(0);
    &:hover {
        transform: translateY(0) ;
    }
    :deep(img) {
        height: 20px;
        width: 20px; // Maintain aspect ratio
    }
}

</style>
