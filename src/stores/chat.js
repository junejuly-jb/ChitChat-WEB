import { defineStore } from 'pinia'
import { markRaw, reactive } from 'vue';

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    rooms: [],
    scroll: '',
    selectedChat: {},
    chatState: false
  }),

  actions: {
    addChats(payload){
      console.log(payload.rooms);
        this.rooms = payload.rooms
        this.selectedChat = payload.rooms[0]
        this.selectedChat.messages = payload.messages
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
      const idx = this.rooms.findIndex( el => el._id == payload.chatroomID)
      this.rooms[idx].messages.push(payload)
    },
    setScroll(payload){
      this.scroll = payload
    }
  }
})
