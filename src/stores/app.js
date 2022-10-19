import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: 'chats',
    dialogPrompt: false,
    selectedIDForDelete: ''
  }),

  actions:{
    changeAppState(payload){
        this.activeTab = payload
    },
    newMessageDialogHandler(payload){
      this.newMessageDialog = payload
    },
    setDialogPrompt(payload){
      this.dialogPrompt = payload
    }
  }
})
