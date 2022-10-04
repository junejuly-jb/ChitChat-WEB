import axios from 'axios'

const getToken = function () {
    const token = localStorage.getItem('token')
    return token
}

const apiClient = axios.create({
    // baseURL: 'https://hashkey-api.vercel.app/api/v2',
    baseURL: 'http://192.168.18.25:5050/api/v1'
})

export default {
    login(payload){
        return apiClient.post('/login', payload)
    },
    register(payload){
        return apiClient.post('/register', payload)
    },
    logout(payload){
        return apiClient.post('/logout/'+payload, {}, { headers: { 'Authorization': 'Bearers ' + getToken() }})
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
    },
    sendMessage(payload){
        return apiClient.post('/send/' + payload.receiver, payload, {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        })
    },
}