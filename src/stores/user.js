import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useChatStore } from './chat'
import { useErrorStore } from './error'
import { useDialogStore } from './dialog'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    user: {},
    selectedUser: {},
  }),

  actions: {
    setUsers(payload){
      this.users = []
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
      const errorStore = useErrorStore()
      const dialogStore = useDialogStore()
      this.users = []
      this.user = {}
      this.unauthenticated = false
      chatStore.rooms = [],
      chatStore.selectedChat = {},
      chatStore.forDeletion = {}
      chatStore.chatState = false,
      chatStore.selectedContextMenu = ''
      appStore.activeTab = 'chats'
      appStore.dialogPrompt = false
      errorStore.hasError = false
      errorStore.errorMessage = ''
      dialogStore.unauthenticated = false
    },
  },

  getters:{
    getUserOnlineStatus: (state) => {
      return (payload) => state.users.find( el => el._id === payload)
    }
  }
})
