import axios from 'axios'

const getToken = function () {
    const token = localStorage.getItem('token')
    return token
}

const apiClient = axios.create({
    // baseURL: 'https://hashkey-api.vercel.app/api/v2',
    baseURL: 'http://localhost:5050/api/v1'
})

export default {
    login(payload){
        return apiClient.post('/login', payload)
    },
    logout(){
        return apiClient.post('/logout', {}, { headers: { 'Authorization': 'Bearers ' + getToken() }})
    },
    getChatRooms(){
        return apiClient.get('/chatrooms', {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        })
    },
    getUsers(){
        return apiClient.get('/users', {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        })
    },
    getMessages(payload){
        return apiClient.get('/message/' + payload, {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        })
    }
}