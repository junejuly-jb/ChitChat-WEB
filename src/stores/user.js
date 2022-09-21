import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [ 
      { _id: '123', name: 'Erika', email: 'erika@gmail.com', intials: 'E'},
      { _id: '124', name: 'Jane', email: 'jane@gmail.com', intials: 'J'}
    ]
  }),

  actions: {
    addUser(payload){
      this.users.push(payload)
    }
  },

  getters: {
    getUserByName: (state) => {
      return (payload) => state.users.filter( (el) => el.name.toLowerCase().includes(payload))
    }
  }
})
