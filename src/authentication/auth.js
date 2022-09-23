export const setToken = (token, expiration) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expiration)
}

const getToken = () => {
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')
    if (!token || !expiration)
        return null
    
    if (Date.now() >= expiration * 1000) {
        this.destroyToken()
        return null
    }
    else return token
}

const destroyToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
}

export const isAuthenticated = () => {
    if (getToken())
        return true
    else
        return false
}
