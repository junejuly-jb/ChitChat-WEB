import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    activeTab: 'chats',
    dialogPrompt: false,
    snackbar: {
      status: false,
      message: '',
      type: ''
    },
    test: true
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
    setTest(){
      this.test = !this.test
    }
  }
})
