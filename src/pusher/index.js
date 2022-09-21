import Pusher from 'pusher-js'

Pusher.logToConsole = true;

const pusher = new Pusher('d592de80e72c6fe09431', {
    cluster: 'ap1'
});

export default pusher