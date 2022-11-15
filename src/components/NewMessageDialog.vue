<script setup>
    import { ref } from 'vue';
    import ChitChatServices from '../services/ChitChatServices';
    import { useChatStore } from '../stores/chat';
    import { ObjectID } from 'bson'
    import { useUserStore } from '../stores/user';
    import { useAppStore } from '../stores/app';

    const chatStore = useChatStore();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const loading = ref(false)

    const cancel = () =>{
        chatStore.handleNewMessageDialog(false)
        chatStore.uncomposeMessage()
    }

    const generateObjectID = () => {
        const id  = new ObjectID();
        return id.toString()
    }

    const send = async () => {
        try {
            loading.value = true

            let message = {
                chatRoomID: "",
                messageClientID: generateObjectID(),
                message: chatStore.compose.input,
                receiver: chatStore.compose._id,
                participants: [
                    { _id: chatStore.compose._id, name: chatStore.compose.name, initials: chatStore.compose.initials },
                    { ...userStore.user, initials: getInitials(userStore.user.name)}
                ]
            }

            const result = await ChitChatServices.sendMessage(message)
            console.log(result.data.chatroom)
            if(result.data.success){
                chatStore.addRoom(result.data.chatroom)
                chatStore.sendMessage(result.data.data)
                appStore.changeAppState('chats')
                loading.value = false
                chatStore.handleNewMessageDialog(false)
                appStore.setSnackBar({message: result.data.message, type: 'success'})
                chatStore.sortRoom()
                chatStore.uncomposeMessage()
            }
            
        } catch (error) {
            console.log(error)
            let message = error.response.data ? error.response.data.message : 'Could not connect to server. Please try again later.'
            appStore.setSnackBar({message, type: 'error'})
        }
        
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
    <v-dialog
      v-model="chatStore.newMessageDialog"
      persistent width="500px"
    >
        <v-card class="card">
            <v-card-title>
            <span class="text-h5">New Message</span>
            </v-card-title>
            <v-card-text>
                <div>
                    <input type="text" v-model="chatStore.compose.name" readonly>
                </div>
                <div class="mt-3">
                    <textarea name="" id="" rows="10" v-model="chatStore.compose.input"></textarea>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="cancel"
                    :disabled="loading"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="send"
                >
                    <div  v-if="loading">
                        <v-progress-circular size="20" indeterminate color="white"></v-progress-circular>
                    </div>
                    <div v-else>
                        Send
                    </div>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style>
    input{
        background-color: rgb(230, 230, 230);
        border-radius: 10px;
        width: 100%;
        height: 40px;
        padding: 0px 20px;
    }
    .card{
        border-radius: 20px !important;
    }
    textarea{
        width: 100%;
        background-color: rgb(230, 230, 230);
        border-radius: 10px;
        padding: 5px 20px;
    }
</style>