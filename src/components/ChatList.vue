<template>
    <div @click="selectChatRoom(chat)" class="main_chat" :class="chatStore.selectedChat._id === chat._id && 'active'">
        <div class="chat_wrapper">
            <v-badge color="green-darken-1" dot offset-y="35" :offset-x="5" v-if="chat.isOnline"> 
                <v-avatar color="grey" size="large">{{ chat.user.initials }}</v-avatar>
            </v-badge>
            <v-avatar color="grey" size="large" v-else>{{ chat.user.initials }}</v-avatar>
            <div style="width: 15px;"></div>
            <div class="content">
                <div class="d-flex">
                    <h5>{{ chat.user.name }}</h5>
                    <span class="dot" v-if="getUnreadLength(chat.unreadMessages) > 0 && chatStore.selectedChat._id !== chat._id"><small>{{getUnreadLength(chat.unreadMessages)}}</small></span>
                </div>
                <div><small>{{ trim(chat.lastMessage) }}</small></div>
            </div>
            
            <div class="context__menu" :style="[chat._id === chatStore.selectedContextMenu && { opacity: '1'}]">
                <div v-if="chat._id === chatStore.selectedContextMenu" v-click-outside="onClickOutside"></div>
                <v-btn icon size="x-small" @click="selectContextMenu(chat._id)">
                  <v-icon>mdi-dots-horizontal</v-icon>
                  <v-menu activator="parent" class="conversation__menu">
                      <v-list>
                          <v-list-item>
                              <v-list-item-title @click="handleClickDelete(chat)">Delete</v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                              <v-list-item-title >Block</v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                              <v-list-item-title >Archive</v-list-item-title>
                          </v-list-item>
                      </v-list>
                  </v-menu>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script setup>
    import ChitChatServices from '../services/ChitChatServices';
    import { useChatStore } from '@/stores/chat';
    import { useUserStore } from '@/stores/user';
    import { useErrorStore } from "@/stores/error";
    import { useAppStore } from '@/stores/app';
    defineProps(['chat'])

    const chatStore = useChatStore()
    const userStore = useUserStore()
    const errorStore = useErrorStore()
    const appStore = useAppStore();

    const selectContextMenu = (id) => chatStore.setSelectedContextMenu(id)

    const onClickOutside = () => chatStore.setSelectedContextMenu('')

    const trim = (string) => {
        let newString = string.substring(0, 25)
        newString = string.length <= 25 ? newString : newString+'...'
        return newString
    }

    const selectChatRoom = async (chat) => {
        chatStore.chooseChat(chat._id)
        if(!chat.hasOwnProperty('messages') || chat.messages.length === 0){
            try {
                chatStore.setChatState(true)
                const getMessagePromise = ChitChatServices.getMessages(chat._id)
                const getUnreadPromise = ChitChatServices.readMessage(chat._id)
                const [ result, unread ] = await Promise.all([ getMessagePromise, getUnreadPromise ])
                chatStore.setMessages({ id: chat._id, messages: result.data.data})
                chatStore.setChatState(false)
                chatStore.removeUnreadMessages(chat._id)
            } catch (error) {
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
    }
    
    const getUnreadLength = (unread) => {
        const unreadmessage = unread.filter( el => el.sender !== userStore.user._id)
        return unreadmessage.length
    }

    const handleClickDelete = (chat) => {
        chatStore.setConvoForDeletion({name: chat.user.name, _id: chat._id})
        appStore.setDialogPrompt(true)
    }
</script>
<style scoped>
    .main_chat{
        cursor: pointer;
        border-radius: 20px;
        transition: 400ms;
        padding: 0 15px;
        margin: 5px 5px;
    }
    .chat_wrapper{
        display: flex;
        align-items: center;
        padding: 10px 5px;
        position: relative;
    }
    .context__menu{
        position: absolute;
        right: 0;
        opacity: 0;
    }
    .main_chat:hover{
        transition: 400ms;
        background-color: rgb(231, 231, 231);
    }
    .main_chat:hover .context__menu{
        opacity: 1;
        transition: 400ms;
    }

    .context__menu:hover{
        opacity: 1;
        transition: 400ms;
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
    .dot{
        background-color: red;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin: 0 10px;
    }
    .v-list-item:hover{
        background-color: rgb(170, 212, 255);
        cursor: pointer;
    }
    .v-list{
        width: 200px;
        border-radius: 20px !important;
    }
</style>