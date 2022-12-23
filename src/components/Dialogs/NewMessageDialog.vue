<script setup>
    import { useDialogStore } from '@/stores/dialog';
    import { useUserStore } from '@/stores/user';
    import { useChatStore } from '@/stores/chat';
    import ChitChatServices from '@/services/ChitChatServices';
    import { ref } from 'vue';
    import { ObjectID } from 'bson';
    import { useErrorStore } from '@/stores/error';
    import { useAppStore } from '@/stores/app';

    //pinia store
    const dialogStore = useDialogStore();
    const userStore = useUserStore();
    const chatStore = useChatStore();
    const errorStore = useErrorStore()
    const appStore = useAppStore();

    //component state
    const step = ref(1);
    const loading = ref(false)

    const handleUserClick = async (user) => {
        const found = chatStore.rooms.find(el => el.user._id === user._id)
        if(found){
            chatStore.chooseChat(found._id)
            dialogStore.dialogHandler({ state: 'newMessageDialog', value: false })
            if(!found.hasOwnProperty('messages') || found.messages.length === 0){
                try {
                    chatStore.setChatState(true)
                    const getMessagePromise = ChitChatServices.getMessages(found._id)
                    const getUnreadPromise = ChitChatServices.readMessage(found._id)
                    const [ result, unread ] = await Promise.all([ getMessagePromise, getUnreadPromise ])
                    chatStore.setMessages({ id: found._id, messages: result.data.data})
                    chatStore.setChatState(false)
                    chatStore.removeUnreadMessages(found._id)
                } catch (error) {
                    if(!error.response.data){
                        errorStore.setError({message: 'Could not connect to server. Please try again later.', hasError: true})
                    }
                    else{
                        errorStore.setError({message: error.response.data.message, hasError: true})
                    }
                    if(error.response.data.status === 401){
                        dialogStore.dialogHandler({ state: 'unauthenticatedDialog', value: true})
                    }
                }
            }
        }
        else{
            chatStore.composeMessage({ _id: user._id, name: user.name, initials: user.initials})
            step.value++
        }
    }

    const generateObjectID = () => {
        const id  = new ObjectID();
        return id.toString()
    }

    const btnSend = async () => {
        const data = {
            participants : [
                { _id: chatStore.compose._id, name: chatStore.compose.name, initials: chatStore.compose.initials },
                userStore.user
            ],
            chatroomID: '',
            message: chatStore.compose.input,
            messageClientID: generateObjectID(),
            receiver: chatStore.compose._id
        }

        try {
            loading.value = true
            const result = await ChitChatServices.sendMessage(data)
            if(!result.data.success) throw new Error(result.data.message)
            chatStore.setNewRoom(result.data.chatroom)
            dialogStore.dialogHandler({ state: 'newMessageDialog', value: false })
        } catch (error) {
            if(!error.response.data){
                appStore.setSnackBar({ status: true, message: "Could not connect to server. Please try again later.", type: 'error'})
            }
            else{
                appStore.setSnackBar({ status: true, message: error.response.data.message, type: 'error'})
            }
            if(error.response.data.status === 401){
                dialogStore.dialogHandler({ state: 'unauthenticatedDialog', value: true})
            }
        } finally{
            loading.value = false
        }
    }
</script>
<template>
    <v-dialog
    v-model="dialogStore.newMessageDialog"
    persistent width="400" height="500"
    >
        <v-card class="rounded-xl">
            <v-card-title>
                <div class="d-flex">
                    <span class="text-h6">New Message</span>
                    <v-spacer></v-spacer>
                    <v-btn variant="flat" size="small" icon>
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                    <v-btn variant="flat" size="small" icon @click="dialogStore.dialogHandler({ state:'newMessageDialog', value: false })">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <div 
                            v-for="user in userStore.users" 
                            class="d-flex align-center py-3 px-2 user__list" 
                            @click="handleUserClick(user)">
                                <v-avatar color="grey" size="large">{{user.initials}}</v-avatar>
                            <div class="mx-2">{{user.name}}</div>
                        </div>
                    </v-window-item>
                    <v-window-item :value="2" class="my-2">
                        <div class="d-flex align-center mb-3">   
                            <v-btn icon variant="flat" size="small" @click="step--">
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>
                            <div>Back</div>
                        </div>
                        <div class="d-flex align-center">
                            <v-avatar color="grey" size="large">{{ chatStore.compose.initials }}</v-avatar>
                            <div class="mx-2"></div>
                            <b>{{ chatStore.compose.name }}</b>
                        </div>
                        <div class="my-4"></div>
                        <textarea name="" id="" cols="30" rows="5" v-model="chatStore.compose.input"></textarea>
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-card-actions v-if="step === 2">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="btnSend">
                    <v-progress-circular
                    indeterminate
                    color="primary"
                    v-if="loading"
                    ></v-progress-circular>
                    <div v-else>Send</div>
                </v-btn>
                
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style>
    .user__list:hover{
        background-color: dodgerblue;
        border-radius: 20px;
        cursor: pointer;
        color: white;
    }
    input{
        background-color: rgb(230, 230, 230);
        border-radius: 10px;
        width: 100%;
        height: 40px;
        padding: 0px 20px;
    }
    textarea{
        background-color: rgb(230, 230, 230);
        border-radius: 10px;
        width: 100%;
        padding: 10px 20px;
    }
    input:focus, textarea:focus{
        outline: none;
    }
</style>