import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    rooms: []
  }),

  actions: {
    addChats(payload){
        this.rooms = payload
    }
  }
})
