import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: 'chats',
    theme: '',
    snackbar: {
      status: false,
      message: '',
      type: ''
    },
  }),

  actions:{
    setTheme(payload){
      this.theme = payload
    },
    changeAppState(payload){
        this.activeTab = payload
    },
    newMessageDialogHandler(payload){
      this.newMessageDialog = payload
    },
    setSnackBar(payload){
      this.snackbar.status = true
      this.snackbar.message = payload.message
      this.snackbar.type = payload.type
      setTimeout(() => {
        this.snackbar.status = false
        this.snackbar.message = ''
        this.snackbar.type = ''
      }, 4000)
    },
  }
})
