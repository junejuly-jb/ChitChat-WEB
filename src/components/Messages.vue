<script setup>
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    import HoverItems from '../components/HoverItems.vue'
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const shouldShowAvatar = (previous, msg) => {
        const isFirst = !previous;
        
        if(isFirst) return true
        
        const differentUser = msg.sender !== previous.sender;
        if(differentUser) return true;
        
        return false
    }

    const isEmoji = (val) => {
        let emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
        return emoji_regex.test(val)
    }

    const shouldShowTimestamp = (previous, msg) => {
        const first = !previous;

        if(first) return false;

        let diffs = Math.abs(new Date(previous.createdAt) - new Date(msg.createdAt));
        const diffmins = diffs / 1000;

        return diffmins > 300;
    }

    const convertTime = (time) => {
        let then = new Date(time)
        let now = new Date();

        const msBetweenDates = Math.abs(then.getTime() - now.getTime());

        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

        const options = {
            ...( hoursBetweenDates > 24 && {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
            }),
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return then.toLocaleString('en-US', options)
    }

</script>
<template>
    <div class="messages-wrapper" id="messageComponent">
        <div class="msgs">
            <div class="d-flex pt-2" v-if="chatStore.selectedChat._id !== '1'">
                <v-avatar 
                    class="avatar__wave" 
                    color="grey" 
                    size="small" 
                    :style="[chatStore.selectedChat.typing.includes(chatStore.selectedChat.user._id) && { marginBottom: '0'}]"
                    >{{chatStore.getChatroom(chatStore.selectedChat._id).user.initials}}
                </v-avatar>
                <div class="ml-1" id="wave" :style="[chatStore.selectedChat.typing.includes(chatStore.selectedChat.user._id) && { marginBottom: '0'}]">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
            <div 
                v-for="(message, idx) in chatStore.selectedChat.messages" 
                :key="message._id"
                
            >
                <div :class="['d-flex align-center message__list', (message.sender === userStore.user._id && 'justify-end')]">
                    <div v-if="shouldShowAvatar(chatStore.selectedChat.messages[idx -1], message)">
                        <v-avatar 
                            color="grey" 
                            size="small" 
                            v-if="message.receiver === userStore.user._id"
                        >
                            {{chatStore.getChatroom(message.chatroomID).user.initials}}
                        </v-avatar>
                    </div>
                    <div v-if="message.sender === userStore.user._id" class="hoverables">
                        <HoverItems/>
                    </div>
                    <div
                        v-if="!isEmoji(message.message)"
                        :class="['msg', 
                            (message.sender === userStore.user._id ? 'sent' : 'received ml-1'),
                            (!shouldShowAvatar(chatStore.selectedChat.messages[idx -1], message) && 'ml-9')
                        ]"
                    >
                        <p>{{ message.message }}</p>
                    </div>
                    <div class="emoji" v-else>{{message.message}}</div>

                    <div v-if="message.sender !== userStore.user._id" class="hoverables">
                        <HoverItems/>
                    </div>
                    
                    <!-- <v-btn>test</v-btn> -->
                    <div class="h-100 d-flex align-end">
                        <v-progress-circular
                            v-if="message.sender === userStore.user._id && message.sentStatus === 'sending'"
                            :width="2"
                            :size="15"
                            color="blue"
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </div>
                <div 
                    class="text-center" 
                    v-if="shouldShowTimestamp(chatStore.selectedChat.messages[idx -1], message)"
                >
                    <small :style="{ color: 'grey'}">{{convertTime(chatStore.selectedChat.messages[idx -1].createdAt)}}</small>
                </div>
            </div>
        </div>
        <div id="stat_wrapper" :style="[chatStore.chatState && { height: '20px'}]"><small><i>Updating conversation...</i></small></div>
    </div>
</template>
<style scoped>
    .messages-wrapper{
        height: 75%;
        overflow-x: hidden;
        padding: 0px 20px;
        display: flex;
        flex-direction: column-reverse;
        position: relative;
        transition: 0.5s;
    }
    #stat_wrapper{
        position: absolute;
        top: 0;
        background-color: orange;
        color: white;
        text-align: center;
        width: 100%;
        height: 0;
        transition: 0.5s;
    }

    .msgs{
        overflow: auto;
        display: flex;
        flex-direction: column-reverse;
        padding: 0px 10px;
    }
    ::-webkit-scrollbar{
        width: 5px;  
        height: 12px;
        opacity:0;
    }

    ::-webkit-scrollbar-track{
        background: rgba(0, 0, 0, 0.1);
    }
    
    ::-webkit-scrollbar-thumb{
        background: rgba(126, 126, 126, 0.5);
    }

    .sent {
        background-color: #395dff;
        color: white;
    }

    .received {
        background-color: lightgray;
    }

    .msg{
        display: flex;
        margin: 2px 0px;
        padding: 5px 15px;
        max-width: 50%;
        border-radius: 20px;
        transition: 0.5s;
    }

    p{
        padding: 0;
        margin: 0;
    }

    #wave{
        padding: 12px 10px;
        background-color: lightgray;
        border-radius: 20px;
        transition: 0.5s;
        margin-bottom: -40px;
    }

    .avatar__wave{
        transition: 0.5s;
        margin-bottom: -40px;
    }
    
    .dot {
        display:inline-block;
        width:8px;
        height:8px;
        border-radius:50%;
        margin-right:3px;
        background: gray;
        animation: wave 1s linear infinite;
        z-index: -1;
    }

    .dot:nth-child(2) {
        animation-delay: -0.8s;
    }

    .dot:nth-child(3) {
        animation-delay: -0.6s;
    }

    .tick{
        height: 15px;
        width: 15px;
        background-color: dodgerblue;
        border-radius: 100%;
        margin: 0px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hoverables{
        opacity: 0;
        transition: .5s;
    }

    .message__list:hover .hoverables{
        opacity: 1;
    }

    .emoji{
        font-size: 40px;
    }

    @keyframes wave {
        0%, 60%, 100% {
            transform: initial;
        }

        30% {
            transform: translateY(-5px);
        }
    }
</style>