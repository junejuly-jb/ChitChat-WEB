<script setup>
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    const chatStore = useChatStore();
    const userStore = useUserStore();


    const shouldShowAvatar = (previous, msg) => {
        const isFirst = !previous;
        
        if(isFirst) return true
        
        const differentUser = msg.sender !== previous.sender
        if(differentUser) return true
        
        return false
    }
</script>
<template>
    <div class="messages-wrapper">
        <div class="msgs">
            <div class="d-flex wave__wrapper">
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
                :class="['d-flex', (message.sender == userStore.user._id && 'justify-end')]" 
                v-for="(message, idx) in chatStore.selectedChat.messages" 
                :key="message._id"
            >
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
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div id="stat_wrapper" v-show="chatStore.chatState"><small><i>Updating conversation...</i></small></div>
        </transition>
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
    }
    #stat_wrapper{
        position: absolute;
        position: -webkit-sticky;
        top: 0;
        background-color: orange;
        color: white;
        text-align: center;
        width: 100%;
        margin-bottom: -24px;
        transition: opacity 0.5s linear;
    }
    #stat_wrapper.hide{
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 1s
    }

    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

    {
    opacity: 0
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
        margin: 3px 0px;
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

    @keyframes wave {
        0%, 60%, 100% {
            transform: initial;
        }

        30% {
            transform: translateY(-5px);
        }
    }
</style>