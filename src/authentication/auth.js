export const setToken = (token, expiration) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expiration)
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')
    if (!token || !expiration)
        return null
    
    if (Date.now() >= expiration * 1000) {
        destroyToken()
        return null
    }
    else return token
}

export const destroyToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
}

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUser = () => {
    localStorage.removeItem('user')
}

export const getUser = async () => {
    const user = await localStorage.getItem('user')
    return JSON.parse(user)
}

export const isAuthenticated = () => {
    if (getToken())
        return true
    else
        return false
}
