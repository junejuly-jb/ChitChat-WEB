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
    setChatState(payload){
      this.chatState = payload
    },
    setMessages(payload){
      this.selectedChat.messages = payload
    },
    clearInput(){
      this.selectedChat.input = ''
    },
    sendMessage(payload){
      const idx = this.rooms.findIndex( el => el._id = payload.chatroomID)
      this.rooms[idx].messages.push(payload)
    }
  }
})
