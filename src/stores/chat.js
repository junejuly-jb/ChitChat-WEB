import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    rooms: [],
    selectedChat: {},
    chatState: false
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
    },
    setChatState(){
      this.chatState = !this.chatState
    },
    setMessages(payload){
      this.selectedChat.messages = payload
    }
  }
})
