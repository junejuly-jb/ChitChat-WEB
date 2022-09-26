import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: 'chats'
  }),

  actions:{
    changeAppState(payload){
        this.activeTab = payload
    }
  }
})
