import { defineStore } from 'pinia'
export const useDialogStore = defineStore({
  id: 'dialog',
  state: () => ({
    settingsDialog: false,
    newMessageDialog: false,
    deleteDialog: false,
    unauthenticatedDialog: false,
  }),

  actions:{
    dialogHandler(payload){
      switch(payload.state){
        case 'deleteDialog':
          this.deleteDialog = payload.value
          break;
        case 'settingsDialog':
          this.settingsDialog = payload.value
          break;
        case 'unauthenticatedDialog':
          this.unauthenticatedDialog = payload.value
          break;
      }
    }
  }

})