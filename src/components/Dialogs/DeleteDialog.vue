<script setup>
import ChitChatServices from '@/services/ChitChatServices';
import { useChatStore } from '@/stores/chat';
import { useAppStore } from '@/stores/app';
import { useErrorStore } from '@/stores/error';
import { useDialogStore } from '@/stores/dialog'
import { ref } from 'vue';

    const chatStore = useChatStore();
    const errorStore = useErrorStore();
    const appStore = useAppStore();
    const dialogStore = useDialogStore();

    const isLoading = ref(false)

    const handleDelete = async () => {
        isLoading.value = true
        try {
            let result = await ChitChatServices.deleteMessage(chatStore.forDeletion.id)
            console.log(result)
            if(!result.data.success) throw new Error(result.data.message);
            dialogStore.dialogHandler({ state: 'deleteDialog', value: false})
            appStore.setSnackBar({ message: result.data.message, type: 'success'})
            chatStore.deleteRoom(chatStore.forDeletion.id)
        } catch (error) {
            dialogStore.dialogHandler({ state: 'deleteDialog', value: false})
            if(!error.response.data){
                errorStore.setError({message: 'Network error. Please try again later.', hasError: true})
            }
            else{
                errorStore.setError({message: error.response.data.message, hasError: true})
            }
            if(error.response.data.status === 401){
                dialogStore.dialogHandler({ state: 'unauthenticatedDialog', value: true})
            }
        }
        isLoading.value = false
    }
</script>

<template>
    <v-dialog
    v-model="dialogStore.deleteDialog"
    persistent width="500px" height="300px"
    >
        <v-card class="rounded-xl">
            <v-card-title>
            <span class="text-h6">Delete </span>
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
                    text
                    @click="dialogStore.dialogHandler({ state: 'deleteDialog', value: false})"
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
</template>