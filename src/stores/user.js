import { defineStore } from 'pinia'


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    user: {} 
  }),

  actions: {
    getUsers(payload){
      this.users = payload
    },
    getUserInfo(payload){
      this.user = payload
    },
    updateUserStatus(payload){
      this.users.map( el => {
        if(el._id == payload._id){
          el.isOnline = payload.isOnline
          if('updatedAt' in el){
            el.updatedAt = payload.updatedAt
          }
        }
      })
    },
  },

  // getters: {
  //   getUserByName: (state) => {
  //     return (payload) => state.users.filter( (el) => el.name.toLowerCase().includes(payload))
  //   }
  // }
})
