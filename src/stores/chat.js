import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    rooms: [],
    selectedChat: {}
  }),

  actions: {
    addChats(payload){
        this.rooms = payload
    },
    setSelectedChat(payload){
        this.selectedChat = payload
    },
    onLogout(){
      this.rooms = []
      this.selectedChat = {}
    }
  }
})
