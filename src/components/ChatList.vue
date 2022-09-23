<template>
    <div class="main_chat">
        <div class="chat_wrapper">
            <div class="avatar">
                <v-avatar color="grey" size="large">JA</v-avatar>
            </div>
            <div style="width: 15px;"></div>
            <div class="content">
                <h5>June</h5>
                <div><small>{{ trim(testString) }}</small></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

    const testString = ref('Lorem ipsum dolor sit ameasd')

    const trim = (string) => {
        let newString = string.substring(0, 25)
        newString = string.length <= 25 ? newString : newString+'...'
        return newString
    }
</script>
<style scoped>
    .main_chat{
        /* background-color: dodgerblue; */
        border-radius: 20px;
        transition: 400ms;
        padding: 0px 15px;
        margin: 0px 5px;
    }
    .chat_wrapper{
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