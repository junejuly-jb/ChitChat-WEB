import { defineStore } from 'pinia'

export const useErrorStore = defineStore({
  id: 'error',
  state: () => ({
    errorMessage: '',
    hasError: false,
  }),

  actions: {
    setError(payload){
        this.errorMessage = payload.message
        this.hasError = payload.hasError
    }
  },
})
