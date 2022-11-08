<template>
    <div class="main_user" @click="handleClickUser(user.user)">
        <div class="user_wrapper">
            <div class="avatar">
                <v-avatar color="grey" size="large">{{ user.user.initials }}</v-avatar>
            </div>
            <div style="width: 15px;"></div>
            <div class="content">
                <h5>{{ user.user.name }}</h5>
                <div><i><small>{{ user.user.isOnline ? 'active now' : 'inactive' }}</small></i></div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useAppStore } from '../stores/app';
    import { useChatStore } from '../stores/chat';

    const user = defineProps(['user'])   
    const appStore = useAppStore()
    const chatStore = useChatStore();

    //TODO: CHECK IF THIS USER HAS MESSAGES
    const handleClickUser = (user) => {
        const user_exists = chatStore.rooms.find( el => el.user._id == user._id)
        if(!user_exists){
            chatStore.composeMessage({ _id: user._id, name: user.name })
        }
        else{
            chatStore.setActiveChat(user_exists)
            appStore.changeAppState('chats')
        }
    
    }
</script>
<style scoped>
    .main_user{
        /* background-color: dodgerblue; */
        border-radius: 20px;
        transition: 400ms;
        padding: 0px 15px;
        margin: 0px 5px;
    }
    .user_wrapper{
        display: flex;
        align-items: center;
        padding: 10px 5px;
        cursor: pointer;
    }
    h4{
        padding: 0 !important;
    }

    .main_user:hover{
        transition: 400ms;
        background-color: rgb(231, 231, 231);
    }
    .avatar{
        padding: 0px 0px;
    }
    .content{
        white-space: nowrap;
        overflow: hidden;
    }
</style>