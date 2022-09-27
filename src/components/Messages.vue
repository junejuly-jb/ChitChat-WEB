<script setup>  
    import { ref } from 'vue';
    import { useChatStore } from '../stores/chat';
    const chatStore = useChatStore()

    const message = ref('asd')
</script>

<template>
    <div class="active_user_head">
        <h2>{{chatStore.selectedChat.user.name}}</h2>
        <small>Active now</small>
        <input type="text" v-model="message">
    </div>
</template>