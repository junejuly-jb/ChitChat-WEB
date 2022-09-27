import Pusher from 'pusher-js'

Pusher.logToConsole = true;

const pusher = new Pusher('d592de80e72c6fe09431', {
    cluster: 'ap1',
    authEndpoint: 'http://localhost:5050/api/v1/pusher/user-auth',
    auth:{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
    // channelAuthorization: {
    //     authEndpoint: 'http:localhost:5050/api/v1/pusher/user-auth'
    // }
});

export default pusher