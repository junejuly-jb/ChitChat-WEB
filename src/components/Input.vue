<script setup>
    import { onMounted, ref } from 'vue';
    import ChitChatServices from '../services/ChitChatServices';
    import { useChatStore } from '../stores/chat';

    const chatStore = useChatStore()

    const btnSend = async (e) => {
        e.preventDefault();
        const result = await ChitChatServices.sendMessage({ 
            receiver: chatStore.selectedChat.user._id,
            chatRoomID: chatStore.selectedChat._id,
            message: chatStore.selectedChat.input
        })
        chatStore.clearInput()
        if(result.data.success){
            chatStore.sendMessage(result.data.data)
            setTimeout(() => {
                chatStore.scroll.scrollIntoView({ block: 'nearest', behavior: 'smooth'})
            }, 500)
        }
        console.log(result)
    }
    const myInput = ref(null)

    // onMounted(() => {
    //     console.log(myInput.value.focus())
        
    // })
</script>
<template>
    <div class="input-wrapper">
        <v-container>
            <input ref="myInput" type="text" v-model="chatStore.selectedChat.input" @keyup.enter="btnSend" tabindex="1"/>
            <v-btn color="blue" type="submit" @click="btnSend"><v-icon icon="mdi-send"></v-icon></v-btn>
        </v-container>
    </div>
</template>
<style scoped>
    input{
        background-color: rgb(230, 230, 230);
        border-radius: 20px;
        width: 85%;
        height: 40px;
        padding: 0px 20px;
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
        justify-content: space-around;
    }
</style>