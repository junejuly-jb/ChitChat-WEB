import { defineStore } from 'pinia'
export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    rooms: [],
    selectedChat: {},
    chatState: false,
    newMessageDialog: false,
    forDeletion: {
      name: '',
      id: ''
    },
    selectedContextMenu: '',
    compose: {
      name: '',
      _id: '',
      input: '',
      initials: ''
    }
  }),

  actions: {
    addRooms(payload){
      this.rooms = payload
    },
    addRoom(payload){
      this.rooms.push(payload)
    },
    setSelectedChat(payload){
      this.selectedChat = {}
      this.selectedChat = payload
      // this.selectedChat.messages = payload.messages
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
      console.log(payload)
      const idx = this.rooms.findIndex( el => el._id == payload.chatroomID)
      this.rooms[idx].messages.unshift(payload)
    },
    clearActiveChat(){
      this.selectedChat = {}
    },
    handleNewMessageDialog(payload){
      this.newMessageDialog = payload
    },
    composeMessage(payload){
      console.log(payload)
      this.compose._id = payload._id
      this.compose.name = payload.name
      this.compose.initials = payload.initials
    },
    uncomposeMessage(){
      this.compose.input = ''
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
      const room = this.rooms.findIndex( el => el._id === payload._id)
      this.rooms[room].unreadMessages.push(payload.message)
    },
    removeUnreadMessages(payload){
      const room = this.rooms.findIndex( el => el._id === payload)
      this.rooms[room].unreadMessages = []
    },
    deleteRoom(payload){
      const room = this.rooms.findIndex( el => el._id === payload)
      this.rooms.splice(room, 1)
      if(payload === this.selectedChat._id){
        this.selectedChat = {}
      }
    },
    setConvoForDeletion(payload){
      this.forDeletion.name = payload.name
      this.forDeletion.id = payload._id
    },
    setSelectedContextMenu(payload){
      this.selectedContextMenu = payload
    },
    setTyping(payload){
      this.selectedChat.typing.push(payload)
    },
    unSetTyping(payload){
      this.selectedChat.typing = this.selectedChat.typing.filter( el => el !== payload)
    },
    setTypingForIncomingEvent(payload){
      const room = this.rooms.findIndex( el => el._id === payload.roomID)
      this.rooms[room].typing.push(payload.user)
    },
    unSetTypingForIncomingEvent(payload){
      const room = this.rooms.findIndex( el => el._id === payload.roomID)
      this.rooms[room].typing = this.rooms[room].typing.filter( el => el !== payload.user)
    },
    chooseChat(id){
      const room = this.rooms.findIndex( el => el._id === id)
      this.selectedChat = this.rooms[room]
    },
    setMessages(payload){
      const room = this.rooms.findIndex( el => el._id === payload.id)
      this.rooms[room].messages = payload.messages.map( obj => ({...obj, sentStatus: 'sent'}))
    },
    updateMessage(payload){
      const room = this.rooms.findIndex( el => el._id === payload.chatroomID)
      const msgIDX = this.rooms[room].messages.findIndex( el => el.messageClientID = payload.messageClientID)
      this.rooms[room].messages[msgIDX] = {...payload, sentStatus: 'sent' }
    },
    updateUserOnlineStatus(payload){
      this.rooms.map( el => {
        if(el.user._id === payload._id){
          el.user.isOnline = payload.isOnline
        }
        else{
          el.user.isOnline = false
        }
      })
    },
  },

  getters:{
    getChatroom: (state) => {
      return (payload) => state.rooms.find( el => el._id === payload)
    },
  }
})
