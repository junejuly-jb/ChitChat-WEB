<template>
  <div class="header">
    <h4>Welcome, {{ userStore.user.name }}</h4>
  </div>
  <div class="wrapper">
    <div class="content d-flex">
      <div id="pref">
        <SideBar/>
      </div>
      <div class="w-20" id="list">
          <div class="active_user_head">
            <h2>{{ appState.activeTab == 'chats' ? 'Chats' : 'Active users' }}</h2>
          </div>
          <div class="chat_list">
            <div v-if="appState.activeTab == 'chats'">
              <div v-for="chat in chats.rooms">
                <ChatListVue :chat="chat"/>
              </div>
            </div>
            <div v-else>
              <div v-for="user in userStore.users">
                <UserList :user="user"/>
              </div>
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
  import { onMounted } from 'vue';
  import ChatListVue from '../components/ChatList.vue';
  import SideBar from '../components/SideBar.vue';
  import ChitChatServices from '../services/ChitChatServices';
  import { useAppStore } from '../stores/app';
  import { useChatStore } from '../stores/chat';
  import { useUserStore } from '../stores/user';
  import UserList from '../components/UserList.vue';
  import pusher from '../pusher';
  import { getUser } from '../authentication/auth';

  const chats = useChatStore()
  const appState = useAppStore()
  const userStore = useUserStore()

  var channel = pusher.subscribe('chitchat');
  channel.bind('online', function(data) {
    userStore.updateUserStatus(data.data)
  });

  const getChatRooms = async () => {
    try {
      const result = await ChitChatServices.getChatRooms()
      chats.addChats(result.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const getUsers = async () => {
    try {
      const result = await ChitChatServices.getUsers()
      userStore.getUsers(result.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const getUserInfo = async () => {
    const user = await getUser()
    userStore.getUserInfo(user)
  }

  onMounted(() => {
    getUserInfo()
    getChatRooms()
    getUsers()
  })
</script>

<style scoped>
  .header{
    padding: 20px 130px;
    text-align: right;
    background-color: rgb(236, 236, 236);
  }
  .wrapper{
    display: flex;
    height: 100vh;
    justify-content: center;
    /* align-items: center; */
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
