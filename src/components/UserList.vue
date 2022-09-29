<template>
    <div class="main_user">
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
    const user = defineProps(['user'])                             
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
    }
    h4{
        padding: 0 !important;
    }

    .main_chat:hover{
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