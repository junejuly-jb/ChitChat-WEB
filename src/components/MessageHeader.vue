<script setup>  
    import ChitChatServices from '../services/ChitChatServices';
    import { useAppStore } from '../stores/app';
    import { useChatStore } from '../stores/chat';

    const chatStore = useChatStore()
    const appStore = useAppStore();

    const handleDelete = () => {
        chatStore.setConvoForDeletion({name: chatStore.selectedChat.user.name, _id: chatStore.selectedChat._id})
        appStore.setDialogPrompt(true)
    }
    
    const handleRefresh = async () => {
        try {
            chatStore.setChatState(true)
            const result = await ChitChatServices.getMessages(chatStore.selectedChat._id)
            
            chatStore.setMessages({ id: chatStore.selectedChat._id, messages: result.data.data})
            chatStore.setChatState(false)
            await ChitChatServices.readMessage(chatStore.selectedChat._id)
            chatStore.removeUnreadMessages(chatStore.selectedChat._id)
        } catch (error) {
            console.log(error)
            if(!error.response.data){
                errorStore.setError({message: 'Could not connect to server. Please try again later.', hasError: true})
            }
            else{
                errorStore.setError({message: error.response.data.message, hasError: true})
            }
            if(error.response.data.status === 401){
                errorStore.setAuthorization(true)
            }
        }
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
                @click="handleRefresh"
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
                <v-icon>mdi-information-outline</v-icon>
                <v-menu activator="parent" class="conversation__menu">
                    <v-list>
                        <v-list-item>
                            <v-list-item-title @click="handleDelete">Delete</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <div class="context__item">
                                <div>Theme</div> <div class="theme__color" :style="{ backgroundColor: chatStore.selectedChat.theme}"></div>
                            </div>
                        </v-list-item>
                        <v-list-item>
                            <div class="context__item">
                                <div>Emoji</div> <div :style="{ fontSize: '20px'}">{{chatStore.selectedChat.emoji}}</div>
                            </div>
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

    .context__item{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .theme__color{
        width: 20px;
        height: 20px;
        border-radius: 50px;
    }
</style>