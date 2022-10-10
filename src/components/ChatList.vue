<template>
    <div @click="selectChatRoom(chat)" class="main_chat" :class="chatStore.selectedChat._id == chat._id ? 'active' : ''">
        <div class="chat_wrapper">
            <v-badge color="green-darken-1" dot offset-y="35" :offset-x="5" v-if="getStatus(chat.user._id)"> 
                <v-avatar color="grey" size="large">{{ chat.user.initials }}</v-avatar>
            </v-badge>
            <v-avatar color="grey" size="large" v-else>{{ chat.user.initials }}</v-avatar>
            <div style="width: 15px;"></div>
            <div class="content">
                <h5>{{ chat.user.name }}</h5>
                <div><small>{{ trim(chat.lastMessage) }}</small></div>
            </div>
            <div class="badge__wrapper" v-if="getUnreadLength(chat.unreadMessages) > 0 && chatStore.selectedChat._id != chat._id">
                <v-badge
                color="blue"
                :content="getUnreadLength(chat.unreadMessages)"
                >
                </v-badge>
            </div>
        </div>
    </div>
</template>
<script setup>
    import ChitChatServices from '../services/ChitChatServices';
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    defineProps(['chat'])
    const emit = defineEmits(['handleScrollEvent'])

    const chatStore = useChatStore()
    const userStore = useUserStore()

    const trim = (string) => {
        let newString = string.substring(0, 25)
        newString = string.length <= 25 ? newString : newString+'...'
        return newString
    }

    const selectChatRoom = async (chat) => {
        chatStore.setChatState(true)
        const result = await ChitChatServices.getMessages(chat._id)
        chatStore.setSelectedChat({ chat, messages: result.data.data})
    }

    const getStatus = (user_id) => {
        const user = userStore.getUserOnlineStatus(user_id)
        return user.isOnline
    }
    
    const getUnreadLength = (unread) => {
        const unreadmessage = unread.filter( el => el.receiver == userStore.user._id)
        return unreadmessage.length
    }
</script>
<style scoped>
    .main_chat{
        /* background-color: dodgerblue; */
        border-radius: 20px;
        transition: 400ms;
        padding: 0px 15px;
        margin: 5px 5px;
    }
    .chat_wrapper{
        display: flex;
        align-items: center;
        padding: 10px 5px;
        position: relative;
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
    .badge__wrapper{
        position: absolute;
        right: 10px;
    }
</style>