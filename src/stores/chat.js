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
      this.rooms = payload.rooms
      this.selectedChat = payload.rooms[0]
      this.selectedChat.messages = payload.messages
    },
    setSelectedChat(payload){
      this.selectedChat = {}
      this.selectedChat = payload.chat
      this.selectedChat.messages = payload.messages
    },
    setActiveChat(payload){
      this.selectedChat = payload
    },
    setChatState(payload){
      this.chatState = payload
    },
    clearInput(){
      this.selectedChat.input = ''
    },
    sendMessage(payload){
      const idx = this.rooms.findIndex( el => el._id == payload.chatroomID)
      this.rooms[idx].messages.unshift(payload)
    },
    clearActiveChat(){
      this.selectedChat = {}
    },
    composeMessage(payload){
      this.selectedChat = {}
      this.selectedChat.messages = []
      this.selectedChat.input = ''
      this.selectedChat._id = '1'
      this.selectedChat.user = {}
      this.selectedChat.user._id = payload._id
      this.selectedChat.user.name = payload.name
    },
    setNewRoom(payload){
      this.rooms.push(payload)
    },
    sortRoom(){
      this.rooms.sort( function(a, b){
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA
      })
    },
    updateChatroom(payload){
      const room = this.rooms.findIndex( el => el._id === payload._id)
      this.rooms[room].updatedAt = payload.updatedAt
      this.rooms[room].lastMessage = payload.lastMessage
    },
    addUnreadMessages(payload){
       console.log(payload)
      const room = this.rooms.findIndex( el => el._id === payload._id)
      this.rooms[room].unreadMessages = payload.unreadMessages
    },
    removeUnreadMessages(payload){
      const room = this.rooms.findIndex( el => el._id === payload)
      this.rooms[room].unreadMessages = []
    }
  },
})
