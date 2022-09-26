<template>
    <div @click="selectChatRoom(chat)" class="main_chat" :class="chatStore.selectedChat._id == chat._id ? 'active' : ''">
        <div class="chat_wrapper">
            <!-- <div class="avatar"> -->
                <v-badge color="green-darken-1" dot offset-y="35" :offset-x="5">
                    <v-avatar color="grey-lighten-1" size="large">{{ chat.user.initials }}</v-avatar>
                </v-badge>
            <!-- </div> -->
            <div style="width: 15px;"></div>
            <div class="content">
                <h5>{{ chat.user.name }}</h5>
                <div><small>{{ trim(chat.message) }}</small></div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import ChitChatServices from '../services/ChitChatServices';
import { useChatStore } from '../stores/chat';
    defineProps(['chat'])

    const chatStore = useChatStore()

    const trim = (string) => {
        let newString = string.substring(0, 25)
        newString = string.length <= 25 ? newString : newString+'...'
        return newString
    }

    const selectChatRoom = async (chat) => {
        chatStore.setSelectedChat(chat)
        const result = await ChitChatServices.getMessages(chat._id)
        console.log(result);
    }
</script>
<style scoped>
    .main_chat{
        /* background-color: dodgerblue; */
        border-radius: 20px;
        transition: 400ms;
        padding: 0px 15px;
        margin: 0px 5px;
    }
    .chat_wrapper{
        display: flex;
        align-items: center;
        padding: 10px 5px;
    }
    h4{
        padding: 0 !important;
    }

    .main_chat:hover{
        transition: 400ms;
        background-color: rgb(231, 231, 231);
    }
    .avatar{
        padding: 0px 0px;
    }
    .content{
        white-space: nowrap;
        overflow: hidden;
    }
    .active{
        background-color: dodgerblue;
        color: white;
    }
    .active:hover{
        background-color: dodgerblue;
        color: white;
    }
</style>