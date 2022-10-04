<script setup>
    import { onMounted, ref } from 'vue';
    import { useChatStore } from '../stores/chat';
    import { useUserStore } from '../stores/user';
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const scroll = ref(null)

    onMounted(() => {
        console.log(scroll.value)
        // scroll.value.current.scrollIntoView({behavior:'smooth'})
    })

</script>
// TODO: add scroller
<template>
    <div class="messages-wrapper">
        <!-- <v-container> -->
            <transition name="fade" mode="out-in">
                <div id="stat_wrapper" v-show="chatStore.chatState"><small><i>Updating conversation...</i></small></div>
            </transition>
            <div class="msgs">
                <div v-for="message in chatStore.selectedChat.messages" key="message._id">
                    <div class="msg" :class="message.sender == userStore.user._id ? 'sent' : 'received'">
                        <p>{{ message.message }}</p>
                    </div>
                </div>
                <div ref="scroll" class="scroller"></div>
            </div>
        <!-- </v-container> -->
    </div>
</template>
<style scoped>
    .messages-wrapper{
        height: 75%;
        overflow: scroll;
        position: relative;
        overflow-x: hidden;
        padding: 0px 20px;
    }
    #stat_wrapper{
        position: sticky;
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
        display: flex;
        flex-direction: column;
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