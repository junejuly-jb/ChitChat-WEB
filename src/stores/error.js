import { defineStore } from 'pinia'

export const useErrorStore = defineStore({
  id: 'error',
  state: () => ({
    errorMessage: '',
    hasError: false,
    unauthenticated: true
  }),

  actions: {
    setError(payload){
        this.errorMessage = payload.message
        this.hasError = payload.hasError
    },  
    setAuthorization(payload){
        this.unauthenticated = payload
    }
  },
})
