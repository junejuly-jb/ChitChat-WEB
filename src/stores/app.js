import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: 'chats',
    scroll: null,
    newMessageDialog: false
  }),

  actions:{
    changeAppState(payload){
        this.activeTab = payload
    },
    newMessageDialogHandler(payload){
      this.newMessageDialog = payload
    }
  }
})
