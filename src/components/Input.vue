<script setup>
    import ChitChatServices from '../services/ChitChatServices';
    import { useAppStore } from '../stores/app';
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    import { ObjectID } from 'bson';

    const chatStore = useChatStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    
    const emit = defineEmits(['handleTyping', 'handleStopTyping'])

    const generateObjectID = () => {
        const id  = new ObjectID();
        return id.toString()
    }

    const btnSend = async (data) => {
        if(data !== 'emoji'){
            if(chatStore.selectedChat.input.trim().length === 0) return;
        }

        let message = {
            receiver: chatStore.selectedChat.user._id,
            sender: userStore.user._id,
            chatroomID: chatStore.selectedChat._id,
            messageClientID: generateObjectID(),
            sentStatus: 'sending',
            message: data === 'emoji' ? chatStore.selectedChat.emoji : chatStore.selectedChat.input
        }

        chatStore.sendMessage(message)
        
        chatStore.clearInput()
        const result = await ChitChatServices.sendMessage(message)

        if(result.data.success){
            chatStore.updateMessage(result.data.data)
            chatStore.updateChatroom({_id: result.data.chatroom._id, updatedAt: result.data.chatroom.updatedAt, lastMessage: result.data.chatroom.lastMessage})
            chatStore.sortRoom()
            emit('handleStopTyping')
        }
        

        // let result;
        // if(chatStore.selectedChat._id == '1'){
        //     result = await ChitChatServices.sendMessage({ 
        //         receiver: chatStore.selectedChat.user._id,
        //         chatroomID: '',
        //         message: chatStore.selectedChat.input,
        //         participants: [
        //             { _id: userStore.user._id, name: userStore.user.name, initials: getInitials(userStore.user.name) },
        //             { _id: chatStore.selectedChat.user._id, name: chatStore.selectedChat.user.name, initials: getInitials(chatStore.selectedChat.user.name) },
        //         ]
        //     })
        // }
        // else{
        //     result = await ChitChatServices.sendMessage({ 
        //         receiver: chatStore.selectedChat.user._id,
        //         chatroomID: chatStore.selectedChat._id,
        //         message: chatStore.selectedChat.input
        //     })
        // }

        // if(result.data.success){
        //     if(chatStore.selectedChat._id == '1'){
        //         chatStore.setNewRoom(result.data.chatroom)
        //         chatStore.setActiveChat(result.data.chatroom)
        //         appStore.changeAppState('chats')              
        //     }
        //     else{
        //         chatStore.updateChatroom({_id: result.data.chatroom._id, updatedAt: result.data.chatroom.updatedAt, lastMessage: result.data.chatroom.lastMessage})
        //     }
        //     chatStore.sendMessage(result.data.data)
        //     chatStore.sortRoom()
        //     emit('handleStopTyping')
        // }
    }

    const getInitials = (string) => {
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

</script>
<template>
    <div class="input-wrapper">
        <v-container>
            <input @keydown="emit('handleTyping')" @focusout="emit('handleStopTyping')" type="text" v-model="chatStore.selectedChat.input" @keyup.enter="btnSend" tabindex="1"/>
            <!-- <v-btn color="blue" type="submit" @click="btnSend"><v-icon icon="mdi-send"></v-icon></v-btn> -->
            <button 
                class="btn__emoji"
                @click="btnSend('emoji')"
                v-if="!chatStore.selectedChat.input || chatStore.selectedChat.input.length === 0"
            >{{chatStore.selectedChat.emoji}}
            </button>
            <button v-else class="btn__send" @click="btnSend('button')">
                <v-icon>mdi-send</v-icon>
            </button>
        </v-container>
    </div>
</template>
<style scoped>
    button{
        transition: 0.5s;
    }
    .btn__emoji{
        font-size: 30px;
    }
    input{
        background-color: rgb(230, 230, 230);
        border-radius: 20px;
        width: 85%;
        height: 40px;
        padding: 0px 20px;
        transition: 0.5s;
    }

    input:focus{
        outline: none;
    }
    .input-wrapper{
        height: 10%;
        /* background-color: blue; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .v-container{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>