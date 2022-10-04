import { defineStore } from 'pinia'


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    user: {},
    selectedUser: {}
  }),

  actions: {
    setUsers(payload){
      // this.users = payload
      payload.map( el => {
        el.isOnline = false
        this.users.push(el)
      })
    },
    setUserInfo(payload){
      this.user = payload
    },
    updateUserStatus(payload){
      this.users.map( el => {
        if(el._id == payload._id){
          el.isOnline = payload.isOnline
        }
      })
    },
    removeState(){
      this.users = []
      this.user = {}
    },
    setSelectedUser(payload){
      this.selectedUser = payload
    }
  },

  getters:{
    getUserOnlineStatus: (state) => {
      return (payload) => state.users.find( el => el._id == payload)
    }
  }
})
