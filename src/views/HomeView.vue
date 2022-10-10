<template>
  <div class="header">
    <h4>Welcome, {{ userStore.user.name }}</h4>
  </div>
  <div class="wrapper">
    <div class="content d-flex">
      <div id="pref">
        <SideBar @onSignout="signout"/>
      </div>
      <div class="w-20" id="list">
          <div class="active_user_head">
            <h2>{{ appState.activeTab == 'chats' ? 'Chats' : 'Active users' }}</h2>
          </div>
          <div class="chat_list">
            <div v-if="appState.activeTab == 'chats'">
              <div v-if="chats.rooms.length != 0">
                <TransitionGroup tag="ul" name="fade" class="container">
                  <div v-for="chat in chats.rooms" class="item" :key="chat._id">
                    <ChatListVue :chat="chat"/>
                  </div>
                </TransitionGroup>
              </div>
              <div v-else class="text-center">
                <div>
                  <v-icon icon="mdi-inbox-outline" size="50" class="text-center"></v-icon>
                </div>
                <h3>No Conversations</h3>
              </div>
            </div>
            <div v-else>
              <div v-for="user in userStore.users">
                <UserList :user="user"/>
              </div>
            </div>
          </div>
      </div>
      <div id="chat" :key="chats.selectedChat._id" v-if="Object.keys(chats.selectedChat).length != '0'">
        <MessageHeader/>
        <Messages/>
        <Input/>
        <!-- <div>hello {{ Object.keys(chats.selectedChat).length }}</div> -->
      </div>
      <v-dialog
        v-model="appState.newMessageDialog"
        width="500"
      >
        <v-card>
          <v-card-title>New message</v-card-title>
          <v-container>
            <span>Send to: <b>{{ userStore.selectedUser.name}}</b></span>
          </v-container>
          <v-card-actions>
            <v-btn color="secondary" @click="appState.newMessageDialogHandler(false)">Close</v-btn>
            <v-btn color="success" @click="handleSend">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>



<script setup>
  import { onMounted, ref } from 'vue';
  import ChatListVue from '../components/ChatList.vue';
  import SideBar from '../components/SideBar.vue';
  import ChitChatServices from '../services/ChitChatServices';
  import { useAppStore } from '../stores/app';
  import { useChatStore } from '../stores/chat';
  import { useUserStore } from '../stores/user';
  import UserList from '../components/UserList.vue';
  import pusherInstance from '../pusher';
  import { getUser, getToken, removeUser, destroyToken } from '../authentication/auth';
  import MessageHeader from '../components/MessageHeader.vue';
  import Messages from '../components/Messages.vue';
  import { useRouter } from 'vue-router';
  import Input from '../components/Input.vue';

  const chats = useChatStore()
  const appState = useAppStore()
  const userStore = useUserStore()
  const router = useRouter()

 
  const pusher = pusherInstance(getToken())
  
  var presenceChannel = pusher.subscribe('presence-online')
  presenceChannel.bind('presence-online')

  presenceChannel.bind("pusher:member_added", (member) => {
    // console.log('added' + JSON.stringify(member, null, 2))
    userStore.updateUserStatus({ _id: member.id, isOnline: true })
  });

  presenceChannel.bind("pusher:subscription_succeeded", (members) => {
    members.each((member) => {
      userStore.updateUserStatus({ _id: member.id, isOnline: true })
    });
  });

  presenceChannel.bind("pusher:member_removed", async (member) => {
    userStore.updateUserStatus({ _id: member.id, isOnline: false })
  });

  const getChatRooms = async () => {
    try {
      const rooms = await ChitChatServices.getChatRooms()
      const messages = await ChitChatServices.getMessages(rooms.data.data[0]._id)
      chats.addChats({ rooms: rooms.data.data, messages: messages.data.data })
    } catch (error) {
      console.log(error.response)
    }
  }

  const signout = async () => {
    pusher.unsubscribe('presence-online')
    pusher.unsubscribe('chitchat')
    removeUser()
    destroyToken()
    chats.onLogout()
    userStore.removeState()
    router.push({ path: '/', replace: true })
  }

  const getUsers = async () => {
    try {
      const result = await ChitChatServices.getUsers()
      userStore.setUsers(result.data)
      const chat_event = `chat-${userStore.user._id}`
      console.log(chat_event)
      var chatChannel = pusher.subscribe('chitchat')
      chatChannel.bind(chat_event, function(data){
        console.log(data)
        const exists = chats.rooms.find( el => el._id == data.chatroom._id)
        if(exists){
          console.log('exists')
          chats.updateChatroom({_id: data.chatroom._id, updatedAt: data.chatroom.updatedAt, lastMessage: data.chatroom.lastMessage})
          chats.sendMessage(data.data)
          chats.sortRoom()
        }
        else{
          console.log('not exists')
          chats.setNewRoom(data.chatroom)
          chats.sendMessage(data.data)
          if(chats.rooms.length == 0){
            chats.setActiveChat()
          }
        }
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const getUserInfo = async () => {
    const user = await getUser()
    userStore.setUserInfo(user)
  }

  onMounted( async () => {
    getUserInfo()
    await getUsers()
    await getChatRooms()
    console.log(chats.getUnreadMessages())
  })
</script>

<style scoped>
  .container {
    position: relative;
    padding: 0;
  }
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
    width: 5px;  
    height: 12px;
    opacity:0;
  }

  ::-webkit-scrollbar-track{
    background: rgba(0, 0, 0, 0.1);
  }
  
  ::-webkit-scrollbar-thumb{
    background: rgba(126, 126, 126, 0.5);
  }

  /* 1. declare transition */
  .fade-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  /* 2. declare enter from and leave to state */
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
  }

  /* 3. ensure leaving items are taken out of layout flow so that moving
        animations can be calculated correctly. */
  .fade-leave-active {
    position: absolute;
  }
</style>
