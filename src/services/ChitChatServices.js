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
    }
}