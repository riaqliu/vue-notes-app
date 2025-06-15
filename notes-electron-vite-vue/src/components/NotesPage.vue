<script setup lang="ts">
import { reactive, computed } from 'vue';
import Header from './Header.vue';

interface Note {
    uuid: number;
    textBody: string;
}
const notes = reactive<Note[]>([])

function clickHandler() {
    const cnt =  notes.length + 1;
    notes.push(
        {
            uuid: cnt,
            textBody: `Note ${cnt}`
        }
    )
}

const minimizeButton = computed(() => {
    return notes.length > 0;
})

</script>
<template>
    <div class="content">
        <Header/>
        <div class="body">
            <div class="item note" v-for="note in notes">
                {{note.textBody}}
            </div>
            <button :class="{ min: minimizeButton }" class="item btn" @click="clickHandler">
                +
            </button>
        </div>
    </div>
</template>
<style lang="scss" scoped>

.content {
    margin: 12px;
}

.body {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    gap: 4px;

    padding: 20px 24px;
    margin: 12px;
    background-color: white;
    border-radius: 5px;
    height: 85vh;

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
    height: 125px;
    width: 125px;
    border-radius: 5px;
    border-width: 0;
    padding: 12px;
    margin: 4px;
}

.btn {
    background-color: #EEEEEE;
    font-size: 48px;
    transform: translateY(0);
    transition: width 0.15s ease;
    height: 146px;
    width: 146px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        width: 146px;
        cursor: pointer;
        transform: translateY(-2px);
        transition: width 0.3s ease, transform 0.2s;
        box-shadow: 1px 1px 12px darkgray;
    }
}

.min {
    background-color: #FAFAFA;
    width: 26px;
    font-size: 24px;
    transform: translateY(0);
    &:hover {
        background-color: #EEEEEE;
        transform: translateY(0);
        font-size: 36px;
    }
}

.note {
    background-color: #FAFAFA;
    font-size: 12px;
}

</style>
