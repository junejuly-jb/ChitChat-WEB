import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: 'chats',
    scroll: null,
  }),

  actions:{
    changeAppState(payload){
        this.activeTab = payload
    }
  }
})
