<script setup>  
    import { useAppStore } from '../stores/app';
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';

    const chatStore = useChatStore()
    const appStore = useAppStore();

    const handleDelete = () => {
        chatStore.setConvoForDeletion({name: chatStore.selectedChat.user.name, _id: chatStore.selectedChat._id})
        appStore.setDialogPrompt(true)
    }
    
</script>

<template>
    <div class="message_header_wrapper">
        <div>
            <div v-if="chatStore.selectedChat._id == '1'">New message</div>
            <span v-if="chatStore.selectedChat._id == '1'">To:&nbsp;&nbsp;</span><span class="username">{{chatStore.selectedChat.user.name}}</span>
            <div class="stats" v-if="chatStore.selectedChat.user.isOnline">{{ chatStore.selectedChat.user.isOnline ? 'Active now' : 'Offline' }}</div>
        </div>
        <div class="btn__wrapper" v-if="chatStore.selectedChat._id !== '1'">
            <v-btn
                icon
                size="small"
                @click=""
                variant="plain"
            >
                <v-icon v-if="!chatStore.chatState">mdi-refresh</v-icon>
                <v-progress-circular
                :size="20"
                :width="3"
                color="white"
                indeterminate
                v-else
                ></v-progress-circular>
            </v-btn>
            <v-btn icon size="small" variant="plain">
                <v-icon>mdi-dots-vertical</v-icon>
                <v-menu activator="parent" class="conversation__menu">
                    <v-list>
                        <v-list-item>
                            <v-list-item-title @click="handleDelete">Delete</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title >Theme</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title >Emoji</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </div>
    </div>
</template>
<style scoped>
    .message_header_wrapper{
        height: 15%;
        display: flex;
        align-items: center;
        position: relative;
    }
    .btn__wrapper{
        position: absolute;
        right: 30px;
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

    .v-list{
        width: 200px;
        border-radius: 20px !important;
    }

    .v-list-item:hover{
        background-color: rgb(170, 212, 255);
        cursor: pointer;
    }
</style>