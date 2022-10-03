<script setup>
    import { defineProps } from 'vue'
    import { useChatStore } from '../stores/chat';
    defineProps(['chatState'])

    const chatStore = useChatStore();
</script>
<template>
    <div class="messages-wrapper">
        <v-container>
            <transition name="fade" mode="out-in">
                <div id="stat_wrapper" v-if="chatState"><small><i>Updating conversation...</i></small></div>
            </transition>
            <div v-for="message in chatStore.selectedChat.messages" key="message._id">
                <div>{{ message.message }}</div>
            </div>
        </v-container>
    </div>
</template>
<style scoped>
    .messages-wrapper{
        height: 75%;
        overflow: scroll;
        position: relative;
        overflow-x: hidden;
        /* background-color: red; */
    }
    #stat_wrapper{
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        background-color: orange;
        color: white;
        text-align: center;
        width: 100%;
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
</style>