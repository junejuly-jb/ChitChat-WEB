<template>
    <div class="input-wrapper">
        <v-container>
            <input type="text"><v-btn color="blue">SEND</v-btn>
        </v-container>
    </div>
</template>
<style scoped>
    input{
        background-color: rgb(230, 230, 230);
        border-radius: 20px;
        width: 85%;
        height: 40px;
    }
    .input-wrapper{
        height: 10%;
        /* background-color: blue; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .v-container{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>