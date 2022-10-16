<template>
  
  <div class="wrapper">
    <div class="outer__content">
      <div class="name__header">
        <h4>Welcome, {{userStore.user.name}}</h4>
      </div>
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
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
  import { defineAsyncComponent, onMounted, ref } from 'vue';
  import SideBar from '../components/SideBar.vue';
  import ChitChatServices from '../services/ChitChatServices';
  import { useAppStore } from '../stores/app';
  import { useChatStore } from '../stores/chat';
  import { useUserStore } from '../stores/user';
  import UserList from '../components/UserList.vue';
  import pusherInstance from '../pusher';
  import { getUser, getToken, removeUser, destroyToken } from '../authentication/auth';
  // import MessageHeader from '../components/MessageHeader.vue';
  // import Messages from '../components/Messages.vue';
  import { useRouter } from 'vue-router';
  // import Input from '../components/Input.vue';

  const chats = useChatStore()
  const appState = useAppStore()
  const userStore = useUserStore()
  const router = useRouter()
  const pusher = pusherInstance(getToken())

  const ChatListVue = defineAsyncComponent(() => import('../components/ChatList.vue'));
  const MessageHeader = defineAsyncComponent(() => import('../components/MessageHeader.vue'));
  const Messages = defineAsyncComponent(() => import('../components/Messages.vue'));
  const Input = defineAsyncComponent(() => import('../components/Input.vue'));
  
  var presenceChannel = pusher.subscribe('presence-online')
  presenceChannel.bind('presence-online')

  presenceChannel.bind("pusher:member_added", (member) => {
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
      await ChitChatServices.readMessage(chats.selectedChat._id)
      chats.removeUnreadMessages(chats.selectedChat._id)
    } catch (error) {
      console.log(error.response)
    }
  }

  const signout = async () => {
    pusher.unsubscribe('presence-online')
    pusher.unsubscribe('chitchat')
    removeUser()
    destroyToken()
    userStore.onLogOut()
    router.push({ path: '/', replace: true })
  }

  const getUsers = async () => {
    try {
      const result = await ChitChatServices.getUsers()
      userStore.setUsers(result.data)
      const chat_event = `chat-${userStore.user._id}`
      console.log(chat_event)
      var chatChannel = pusher.subscribe('chitchat')
      chatChannel.bind(chat_event, async function(data){
        console.log(data)
        const exists = chats.rooms.find( el => el._id == data.chatroom._id)
        if(exists){
          chats.updateChatroom({_id: data.chatroom._id, updatedAt: data.chatroom.updatedAt, lastMessage: data.chatroom.lastMessage})
          chats.sendMessage(data.data)
          chats.sortRoom()
        }
        else{
          chats.setNewRoom(data.chatroom)
          chats.sendMessage(data.data)
          if(Object.keys(chats.selectedChat).length == 0){
            chats.setActiveChat()
          }
        }

        if(chats.selectedChat._id == data.chatroom._id){
          const unread = await ChitChatServices.readMessage(data.chatroom._id)
          if(unread.data.success){
            chats.removeUnreadMessages(data.chatroom._id)
          }
        }
        else{
          chats.addUnreadMessages({ _id: data.chatroom._id, unreadMessages: data.chatroom.unreadMessages })
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
  })
</script>

<style scoped>
  .container {
    position: relative;
    padding: 0;
  }
  .header{
    /* padding: 20px 130px; */
    text-align: right;
    background-color: rgb(236, 236, 236);
  }
  .wrapper{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: rgb(236, 236, 236);
  }
  .content{
    position: absolute;
    bottom: 0;
    height: 95%;
    width: 100%;
    border-radius: 30px;
    background-color: white;
  }
  .outer__content{    
    position: relative;
    width: 80%;
    height: 95%;
  }

  .name__header{
    position: absolute;
    right: 0;
    /* top: 20px; */
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
