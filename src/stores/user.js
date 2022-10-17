import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useChatStore } from './chat'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    user: {},
    selectedUser: {},
  }),

  actions: {
    setUsers(payload){
      payload.map( el => {
        el.isOnline = false
        this.users.push(el)
      })
    },
    setUserInfo(payload){
      this.user = payload
    },
    updateUserStatus(payload){
      this.users.map( el => {
        if(el._id === payload._id){
          el.isOnline = payload.isOnline
        }
      })
    },
    onLogOut(){
      const chatStore = useChatStore()
      const appStore = useAppStore()
      this.users = []
      this.user = {}
      this.unauthenticated = false
      chatStore.rooms = [],
      chatStore.selectedChat = {},
      chatStore.chatState = false,
      appStore.activeTab = 'chats'
    },
  },

  getters:{
    getUserOnlineStatus: (state) => {
      return (payload) => state.users.find( el => el._id === payload)
    }
  }
})
