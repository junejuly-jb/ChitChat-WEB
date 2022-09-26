<script setup>  
    import { useChatStore } from '../stores/chat';
    const chatStore = useChatStore()
</script>

<template>
    <div class="active_user_head">
        <h2>{{chatStore.selectedChat.user.name}}</h2>
        <small>Active now</small>
    </div>
</template>