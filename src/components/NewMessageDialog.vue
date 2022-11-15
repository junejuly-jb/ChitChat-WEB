<script setup>
    import { ref } from 'vue';
    import ChitChatServices from '../services/ChitChatServices';
    import { useChatStore } from '../stores/chat';

    const chatStore = useChatStore();
    const loading = ref(false)

    const cancel = () => chatStore.handleNewMessageDialog(false)
    const send = async () => {
        loading.value = true
        const result = await ChitChatServices.sendMessage()
        console.log(chatStore.compose)
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
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="send"
                >
                    Send
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