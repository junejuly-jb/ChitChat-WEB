<template>
  <div class="wrapper">
    <div class="content d-flex">
      <div id="pref">
        <v-container class="text-center">
          <div>
            <v-icon @click="changeAppState('users')" :color="appState == 'users' ? 'blue' : 'grey'" size="20">fa fa-users</v-icon>
          </div>
          <div class="py-5"></div>
          <div>
            <v-icon @click="changeAppState('chats')" :color="appState == 'chats' ? 'blue' : 'grey'" size="20">fa fa-comments</v-icon>
          </div>
          <div class="py-5"></div>
          <div>
            <v-icon color="grey" size="20">fa fa-sign-out</v-icon>
          </div>
        </v-container>
      </div>
      <div class="w-20" id="list">
          <div class="active_user_head">
            <h2>{{ appState == 'chats' ? 'Chats' : 'Active users' }}</h2>
          </div>
          <div class="chat_list">
            <div v-if="appState == 'chats'">
              <div v-for="item in 10">
                <ChatListVue/>
              </div>
            </div>
            <div v-else>
                USERs
            </div>
          </div>
      </div>
      <div class="w-70" id="chat">3</div>
    </div>
  </div>
  <!-- <div class="main_wrapper d-flex">
    
  </div> -->
</template>



<script setup>
import { ref } from 'vue';
import ChatListVue from '../components/ChatList.vue';

const appState = ref('chats')

const changeAppState = (state) => {
  appState.value = state
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: rgb(236, 236, 236);
  }
  .content{
    height: 85%;
    width: 85%;
    border-radius: 30px;
    background-color: white;
  }
  #pref{
    width: 5%;
    display: flex;
    align-items: center;
  }
  #list{
    width: 25%;
  }
  #chat{
    width: 70%;
  }
  .active_user_head{
    padding: 0px 20px;
    height: 15%;
    display: flex;
    align-items: center;
  }
  .chat_list{
    height: 80%;
    overflow: auto;

  }


  ::-webkit-scrollbar{
    width: 5px;  /* for vertical scrollbars */
    height: 12px; /* for horizontal scrollbars */
    opacity:0;
  }

  ::-webkit-scrollbar-track{
    background: rgba(0, 0, 0, 0.1);
  }
  
  ::-webkit-scrollbar-thumb{
    background: rgba(126, 126, 126, 0.5);
  }
</style>
