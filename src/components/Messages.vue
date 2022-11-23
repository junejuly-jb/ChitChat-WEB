<script setup>
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    import HoverItems from '../components/HoverItems.vue'
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const shouldShowAvatar = (previous, msg) => {
        const isFirst = !previous;
        
        if(isFirst) return true
        
        const differentUser = msg.sender !== previous.sender
        if(differentUser) return true
        
        return false
    }

    const shouldShowTimestamp = (previous, msg) => {
        const first = !previous;

        if(first) return false;

        let diffs = Math.abs(new Date(previous.createdAt) - new Date(msg.createdAt));
        const diffmins = diffs / 1000;

        return diffmins > 300 ? true : false;
    }

    const convertTime = (time) => {
        let chatTime = new Date(time)
        let oneday = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);

        var options = {
            ...( oneday < chatTime && {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
            }),
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return chatTime.toLocaleString('en-US', options)
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
                <div :class="['d-flex align-center message__list', (message.sender == userStore.user._id && 'justify-end')]">
                    <div v-if="shouldShowAvatar(chatStore.selectedChat.messages[idx -1], message)">
                        <v-avatar 
                            color="grey" 
                            size="small" 
                            v-if="message.receiver == userStore.user._id"
                        >
                            {{chatStore.getChatroom(message.chatroomID).user.initials}}
                        </v-avatar>
                    </div>
                    <div
                        :class="['msg', 
                            (message.sender == userStore.user._id ? 'sent' : 'received ml-1'),
                            (!shouldShowAvatar(chatStore.selectedChat.messages[idx -1], message) && 'ml-9')
                        ]"
                    >
                        <p>{{ message.message }}</p>
                    </div>
                    <div v-if="message.sender !== userStore.user._id" class="hoverables">
                        <HoverItems/>
                    </div>
                    
                    <!-- <v-btn>test</v-btn> -->
                    <div class="h-100 d-flex align-end">
                        <v-progress-circular
                        v-if="message.sender === userStore.user._id && message.sentStatus == 'sending'"
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
        /* float: right; */
    }

    .received {
        background-color: lightgray;
        /* float: left; */
        /* margin-left: 2px; */
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

    @keyframes wave {
        0%, 60%, 100% {
            transform: initial;
        }

        30% {
            transform: translateY(-5px);
        }
    }
</style>