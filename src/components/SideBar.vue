<script setup>
import { ref } from 'vue';
import { useAppStore } from '../stores/app';
import { destroyToken, removeUser, getToken } from '../authentication/auth'
import { useRouter } from 'vue-router';
import ChitChatServices from '../services/ChitChatServices';
import { useUserStore } from '../stores/user';
import pusherInstance from '../pusher';
// import Pusher from 'pusher-js'
    const appState = useAppStore()
    const userStore = useUserStore()
    const dialog = ref(false)
    const errDialog = ref(false)
    const router = useRouter();

    // var channel = pusher.subscribe('chitchat');
    // channel.bind('offline', function(data) {
    //     userStore.updateUserStatus(data.data)
    // });

    const pusher = pusherInstance(getToken())
    const presenceChannel = pusher.subscribe('presence-online')
  
    //TODO: TRY THE EMIT FUNCTION
    const onSignOut = async () => {
      pusher.unsubscribe('presence-online')
      presenceChannel.unbind()
      console.log(pusher)
      destroyToken()
      removeUser()
      router.push({ path: '/', replace: true })
        // try {
          

        //     // await ChitChatServices.logout()
        //     // destroyToken()
        //     // removeUser()
        //     // router.push({ path: '/', replace: true })
        //     // pusher.unsubscribe('presence-online')
        //     // pusher.unbind('presence-online')
        //     // pusher.disconnect()
        // } catch (error) {
        //     errDialog.value = true
        // }
        
    }

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
          <v-btn color="error" @click="onSignOut">Logout</v-btn>
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