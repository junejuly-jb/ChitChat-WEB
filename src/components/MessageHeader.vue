<script setup>  
    import { ref } from 'vue';
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';

    const chatStore = useChatStore()
    const userStore = useUserStore()
    
    const getStatus = (user_id) => {
        let user = userStore.getUserOnlineStatus(user_id)
        const status = user.isOnline ? 'active now' : 'offline'
        return status
    }
    
</script>

<template>
    <div class="message_header_wrapper">
        <v-container>
            <div v-if="chatStore.selectedChat._id == '1'">New message</div>
            <span v-if="chatStore.selectedChat._id == '1'">To:</span>&nbsp;&nbsp;<span class="username">{{chatStore.selectedChat.user.name}}</span>
            <div class="stats" v-if="getStatus(chatStore.selectedChat.user._id) == 'active now'">{{ getStatus(chatStore.selectedChat.user._id) }}</div>
        </v-container>
    </div>
</template>
<style scoped>
    .message_header_wrapper{
        height: 15%;
        display: flex;
        align-items: center;
    }
    .message_header_wrapper > h2 {
        padding: 0;
        margin: 0;
    }
    .stats{
        color: lightgreen;
        font-size: 12px;
        font-weight: bold;
    }
    .username{
        padding: 0;
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }
</style>