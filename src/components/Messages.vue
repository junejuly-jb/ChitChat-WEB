<script setup>
    import { onMounted } from 'vue';
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const handleScroll = ({ target: { scrollTop, clientHeight, scrollHeight }}) => {
        if (scrollTop + clientHeight >= scrollHeight) {
            console.log('test')
        }
        console.log('test123')
    }   

    // onMounted(() => onScrollEvent(e))
</script>
<template>
    
    <!-- v-show="chatStore.chatState" -->
    <div class="messages-wrapper" @scroll.passive="handleScroll">
        <div class="msgs">
            <div v-for="message in chatStore.selectedChat.messages" :key="message._id">
                <div class="msg" :class="message.sender == userStore.user._id ? 'sent' : 'received'">
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
        float: right;
    }

    .received {
        background-color: lightgray;
        float: left;
        margin-left: 2px;
    }

    .msg{
        display: flex;
        margin: 3px 0px;
        padding: 5px 15px;
        max-width: 50%;
        border-radius: 20px;
    }

    p{
        padding: 0;
        margin: 0;
    }
    
</style>