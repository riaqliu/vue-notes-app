<script setup lang="ts">
import { ref } from 'vue';

const isDropdownOpen = ref(false);

</script>
<template>
    <div class="dropdown-button">
        <Button @click="isDropdownOpen=!isDropdownOpen"/>
        <template v-if="isDropdownOpen">
            <div class="dropdown-menu">
                <slot></slot>
            </div>
        </template>
    </div>
</template>
<style scoped lang="scss">
@use "@/stylesheets/default.scss" as *;

.dropdown-button {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    padding: 0;
    margin: 0;
    display: inline-block;
    position: absolute;
}
</style>