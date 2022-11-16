<template>
  
  <div class="wrapper">
    <div class="outer__content">
      <!-- <small class="error__header" v-if="errorStore.hasError">
        {{errorStore.errorMessage}}
      </small>
      <div class="name__header  align-center">
        <h4>Welcome, {{userStore.user.name}}</h4>
        <v-btn icon size="small">
            <v-icon>mdi-cog</v-icon>
            <v-menu activator="parent" class="conversation__menu">
                <v-list>
                    <v-list-item>
                        <v-list-item-title @click="handleDelete">Delete</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title >Theme</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title >Emoji</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
      </div> -->
      <div class="content d-flex">
        <div id="pref">
          <SideBar @onSignout="signout" @getUsers="getUsers"/>
        </div>
        <div class="w-20" id="list">
            <div class="active_user_head">
              <div class="userHeader">
                <v-avatar color="grey" size="small">JB</v-avatar>
                <div class="my-2"></div>
                <h2>{{ appState.activeTab === 'chats' ? 'Chats' : 'Active users' }}</h2>
              </div>
              <div>
                <v-btn
                  icon
                  size="small"
                  @click="handleRefresh(appState.activeTab)"
                  variant="plain"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="chat_list">
              <input type="text" class="search">
              <div v-if="appState.activeTab === 'chats'">
                <div v-if="chats.rooms.length !== 0 && !isFetchingChat">
                  <TransitionGroup tag="ul" name="fade" class="container">
                    <div v-for="chat in chats.rooms" class="item" :key="chat._id">
                      <ChatListVue :chat="chat"/>
                    </div>
                  </TransitionGroup>
                </div>
                <div class="h-100 no__conversation" v-if="chats.rooms.length === 0 && !isFetchingChat">
                  <NoData title="No Conversations" icon="mdi-inbox-outline"/>
                </div>
                <div v-if="isFetchingChat" class="h-100 loader">
                  <Loader title="Fetching Conversations..."/>
                </div>
              </div>
              <div v-else>
                <div v-if="userStore.users.length !== 0 && !isFetchingUser">
                  <TransitionGroup tag="ul" name="fade" class="container">
                    <div v-for="user in userStore.users" :key="user._id">
                      <UserList :user="user"/>
                    </div>
                  </TransitionGroup>
                </div>
                <div class="h-100 no__conversation" v-if="userStore.users.length === 0 && !isFetchingUser">
                  <NoData title="No Users" icon="mdi-inbox-outline"/>
                </div>
                <div v-if="isFetchingUser" class="h-100 loader">
                  <Loader title="Fetching Users..."/>
                </div>
              </div>
            </div>
        </div>
        <div id="chat" :key="chats.selectedChat._id" v-if="Object.keys(chats.selectedChat).length !== 0">
          <MessageHeader/>
          <Messages/>
          <Input @handleTyping="handleTyping" @handleStopTyping="handleStopTyping"/>
        </div>
      </div>
    </div>
    <div v-if="errorStore.unauthenticated">
      <Dialog @signout="signout"/>
    </div>
    <DeleteDialog/>
    <Snackbar/>
    <NewMessageDialog/>
  </div>
</template>

<script setup>
  import { defineAsyncComponent, onMounted, ref } from 'vue';
  import SideBar from '../components/SideBar.vue';
  import ChitChatServices from '../services/ChitChatServices';
  import { useAppStore } from '@/stores/app';
  import { useChatStore } from '@/stores/chat';
  import { useUserStore } from '@/stores/user';
  import { useErrorStore } from '@/stores/error';
  import UserList from '../components/UserList.vue';
  import pusherInstance from '../pusher';
  import { getUser, getToken, removeUser, destroyToken } from '@/authentication/auth';
  import { useRouter } from 'vue-router';

  const chats = useChatStore()
  const appState = useAppStore()
  const userStore = useUserStore()
  const errorStore = useErrorStore();
  const router = useRouter()
  const pusher = pusherInstance(getToken())
  const isFetchingChat = ref(false);
  const isFetchingUser = ref(false);

  const ChatListVue = defineAsyncComponent(() => import('../components/ChatList.vue'));
  const MessageHeader = defineAsyncComponent(() => import('../components/MessageHeader.vue'));
  const Messages = defineAsyncComponent(() => import('../components/Messages.vue'));
  const Input = defineAsyncComponent(() => import('../components/Input.vue'));
  const Dialog = defineAsyncComponent(() => import('../components/Dialog.vue'));
  const DeleteDialog = defineAsyncComponent(() => import('../components/DeleteDialog.vue'))
  const Snackbar = defineAsyncComponent(() => import('../components/SnackBar.vue'))
  const NoData = defineAsyncComponent(() => import('../components/NoData.vue'))
  const Loader = defineAsyncComponent(() => import('../components/Loader.vue'))
  const NewMessageDialog = defineAsyncComponent(() => import('../components/NewMessageDialog.vue'));

  const presenceChannel = pusher.subscribe('presence-online')
  const typingChannel = pusher.subscribe('private-typing')

  presenceChannel.bind('presence-online')

  presenceChannel.bind("pusher:member_added", (member) => {
    userStore.updateUserStatus({ _id: member.id, isOnline: true })
  });

  presenceChannel.bind("pusher:subscription_succeeded", (members) => {
    members.each((member) => {
      userStore.updateUserStatus({ _id: member.id, isOnline: true })
      chats.updateUserOnlineStatus({ _id: member.id, isOnline: true})
    });
  });

  presenceChannel.bind("pusher:member_removed", async (member) => {
    userStore.updateUserStatus({ _id: member.id, isOnline: false })
  });

  const mutateFetch = (val) => {
    isFetchingUser.value = val;

    console.log(isFetchingUser.value + 'fetch')
  }

  const getChatRooms = async () => {
    try {
      const rooms = await ChitChatServices.getChatRooms()
      if(rooms.data.data.length !== 0){
        chats.addRooms(rooms.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signout = async () => {
    pusher.unsubscribe('presence-online')
    pusher.unsubscribe('chitchat')
    removeUser()
    destroyToken()
    await router.push({path: '/', replace: true})
    userStore.onLogOut()
  }    


  const getUsers = async () => {
    try {
      isFetchingUser.value = true
      const result = await ChitChatServices.getUsers()
      userStore.setUsers(result.data)
    } catch (error) {
      if(!error.response.data){
          errorStore.setError({message: 'Could not connect to server. Please try again later.', hasError: true})
      }
      else{
        errorStore.setError({message: error.response.data.message, hasError: true})
      }
      if(error.response.data.status === 401){
        errorStore.setAuthorization(true)
      }
    } finally{
      isFetchingUser.value = false
    }
  }

  const channelEventListener = () => {
    const chatChannel = pusher.subscribe('chitchat')
    const chat_event = `chat-${userStore.user._id}`
    
    chatChannel.bind(chat_event, async function(data){
      // data = JSON.parse(data)
      console.log(data)
      const exists = chats.rooms.find( el => el._id === data.chatroom._id)
      if(exists){
        chats.updateChatroom({_id: data.chatroom._id, updatedAt: data.chatroom.updatedAt, lastMessage: data.chatroom.lastMessage})
        if(exists.messages){
          chats.sendMessage(data.data)
        }
      }
      else{
        chats.setNewRoom(data.chatroom)
      }
      chats.sortRoom()

      if(chats.selectedChat._id === data.chatroom._id){
        const unread = await ChitChatServices.readMessage(data.chatroom._id)
        if(unread.data.success){
          chats.removeUnreadMessages(data.chatroom._id)
        }
      }
      else{
        chats.addUnreadMessages({ _id: data.chatroom._id, message: { _id: data.chatroom._id, sender: data.data.sender, message: data.data.message} })
      }
    })

    typingChannel.bind('client-isTyping', (data) => {
      if(chats.rooms.find( e => e._id === data.roomID)){
        chats.setTypingForIncomingEvent(data)
      }
    })

    typingChannel.bind('client-isNotTyping', (data) => {
      if(chats.rooms.find( e => e._id === data.roomID)){
        chats.unSetTypingForIncomingEvent(data)
      }
    })
  }

  const getUserInfo = async () => {
    const user = await getUser()
    userStore.setUserInfo(user)
  }

  const handleTyping = () => {
    if (chats.selectedChat._id !== '1') {
      if(!chats.selectedChat.typing.includes(userStore.user._id)){
        chats.setTyping(userStore.user._id)
        typingChannel.trigger('client-isTyping', { roomID: chats.selectedChat._id, user: userStore.user._id })
      }
      if(chats.selectedChat.typing.includes(userStore.user._id)){
        if(chats.selectedChat.input){
          if(chats.selectedChat.input.length <= 1){
            chats.unSetTyping(userStore.user._id)
            typingChannel.trigger('client-isNotTyping', { roomID: chats.selectedChat._id, user: userStore.user._id })
          }
        }
      }
    }
  }

  const handleStopTyping = () => {
    if (chats.selectedChat._id !== '1') {
      if(chats.selectedChat.typing.includes(userStore.user._id)){
        chats.unSetTyping(userStore.user._id)
        typingChannel.trigger('client-isNotTyping', { roomID: chats.selectedChat._id, user: userStore.user._id })
      }
    }
  }

  const handleRefresh = async (state) => {
    chats.clearActiveChat()
    if(state == 'chats'){
      isFetchingChat.value = true
      await getChatRooms();
      isFetchingChat.value = false
    }
    else{
      isFetchingUser.value = true
      await getUsers();
      isFetchingUser.value = false
    }
  }

  onMounted( async () => {
    isFetchingChat.value = true
    await getUserInfo()
    channelEventListener()
    await getChatRooms()
    isFetchingChat.value = false
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
    height: 100%;
    width: 100%;
    border-radius: 30px;
    background-color: white;
  }
  .outer__content{
    width: 80%;
    height: 95%;
  }

  .name__header{
    position: absolute;
    right: 0;
    /* top: 20px; */
  }

  .error__header{
    position: absolute;
    left: 0;
    background-color: rgb(255, 102, 102);
    padding: 5px 20px;
    border-radius: 20px;
    color: white;
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
    padding: 0 20px;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat_list{
    height: 85%;
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

  .loader{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .no__conversation{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .userHeader{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .search{
    background-color: rgb(230, 230, 230);
    border-radius: 10px;
    width: 100%;
    height: 40px;
    padding: 0px 20px;
  }
</style>
