<script setup>
    import { useDialogStore } from '@/stores/dialog';

    const dialogStore = useDialogStore();
</script>
<template>
    <button 
        class="chat__btn"
        @click="dialogStore.dialogHandler({ state: 'newMessageDialog', value: true })"
    >
        <v-icon color="white">mdi-chat</v-icon>
         &nbsp; Start Chat
    </button>
</template>

<style>
    .chat__btn{
        padding: 20px 25px;
        background-color: dodgerblue;
        border-radius: 20px;
        color: white;
    }
</style>