import Pusher from 'pusher-js'

// Pusher.logToConsole = true;

const getToken = function () {
    const token = localStorage.getItem('token')
    return token
}


// const endPoint = 'https://chitchatapi.vercel.app/api/v1/pusher/user-auth';
const endPoint = import.meta.env.VITE_PUSHER_AUTH_ENDPOINT;
const pusherInstance = (token) => {
    const pusher = new Pusher('d592de80e72c6fe09431', {
        cluster: 'ap1',
        authEndpoint: endPoint,
        auth: {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        // channelAuthorization: {
        //     authEndpoint: 'http:localhost:5050/api/v1/pusher/user-auth'
        // }
    });

    return pusher
}

export default pusherInstance