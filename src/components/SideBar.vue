<script setup>
import { ref } from 'vue';
import { useAppStore } from '../stores/app';
  const emit = defineEmits(['onSignout'])
  const appState = useAppStore()
  const dialog = ref(false)
  const errDialog = ref(false)
</script>
<template>
    <v-container class="text-center">
        <div>
            <v-icon @click="appState.changeAppState('users')" :color="appState.activeTab == 'users' ? 'blue' : 'grey'" size="20" icon="mdi-account-multiple"></v-icon>
        </div>
        <div class="py-5"></div>
        <div>
            <v-icon @click="appState.changeAppState('chats')" :color="appState.activeTab == 'chats' ? 'blue' : 'grey'" size="20" icon="mdi-chat"></v-icon>
        </div>
        <div class="py-5"></div>
        <div>
            <v-icon @click="dialog = true" color="grey" size="20" icon="mdi-logout"></v-icon>
        </div>
    </v-container>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>Sign out</v-card-title>
        <v-card-text>Do you want to log out?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
          <v-btn color="error" @click="() => emit('onSignout')">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="errDialog"
      width="500"
    >
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>Error when logging out</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="errDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>