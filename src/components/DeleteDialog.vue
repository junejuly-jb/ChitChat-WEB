<script setup>
import ChitChatServices from '../services/ChitChatServices';
import { useChatStore } from '../stores/chat';
import { useAppStore } from '../stores/app';
import { useErrorStore } from '../stores/error';
import { ref } from 'vue';

    const chatStore = useChatStore();
    const errorStore = useErrorStore();
    const appStore = useAppStore();

    const isLoading = ref(false)

    const handleDelete = async () => {
        isLoading.value = true
        try {
            let result = await ChitChatServices.deleteMessage(chatStore.selectedChat._id)
            appStore.setDialogPrompt(false)
            appStore.setSnackBar({ message: result.data.message, type: 'success'})
        } catch (error) {
            appStore.setDialogPrompt(false)
            if(!error.response.data){
                errorStore.setError({message: 'Network error. Please try again later.', hasError: true})
            }
            else{
                errorStore.setError({message: error.response.data.message, hasError: true})
            }
            if(error.response.data.status === 401){
                errorStore.setAuthorization(true)
            }
        }
        isLoading.value = false
    }
</script>

<template>
    <div>
        <v-dialog
        v-model="appStore.dialogPrompt"
        persistent width="500px" height="300px"
        >
        <v-card>
            <v-card-title>
            <span class="text-h5">Delete </span>
            </v-card-title>
            <v-card-text>
                <div class="text-center" v-if="isLoading">
                    <v-progress-circular indeterminate color="red"></v-progress-circular>
                </div>
                <v-container v-else>
                    Are you sure you want to delete your conversation with <b>{{chatStore.forDeletion.name}}</b> ? This action cannot be undone.
                </v-container>
            </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="appStore.setDialogPrompt(false)"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="red"
                        text
                        @click="handleDelete"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>