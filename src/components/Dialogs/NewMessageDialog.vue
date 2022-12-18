<script setup>
    import { useDialogStore } from '@/stores/dialog';
    import { ref } from 'vue';

    const dialogStore = useDialogStore();

    const step = ref(1);
</script>
<template>
    <v-dialog
    v-model="dialogStore.newMessageDialog"
    persistent width="400" height="500"
    >
        <v-card class="rounded-xl">
            <v-card-title>
                <div class="d-flex">
                    <span class="text-h6">New Message</span>
                    <v-spacer></v-spacer>
                    <v-btn variant="flat" size="small" icon>
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                    <v-btn variant="flat" size="small" icon @click="dialogStore.dialogHandler({ state:'newMessageDialog', value: false })">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <div v-for="item in 20" class="d-flex align-center py-3 px-2 user__list" @click="step++">
                            <v-avatar color="grey" size="large">JB</v-avatar>
                            <div class="mx-2">June Amante</div>
                        </div>
                    </v-window-item>
                    <v-window-item :value="2" class="my-2">
                        <div class="d-flex align-center mb-3">   
                            <v-btn icon variant="flat" size="small" @click="step--">
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>
                            <div>Back</div>
                        </div>
                        <input type="text"/>
                        <div class="my-4"></div>
                        <textarea name="" id="" cols="30" rows="5"></textarea>
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-card-actions v-if="step === 2">
                <v-spacer></v-spacer>
                <v-btn color="primary">Send</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style>
    .user__list:hover{
        background-color: dodgerblue;
        border-radius: 20px;
        cursor: pointer;
        color: white;
    }
    input{
        background-color: rgb(230, 230, 230);
        border-radius: 10px;
        width: 100%;
        height: 40px;
        padding: 0px 20px;
    }
    textarea{
        background-color: rgb(230, 230, 230);
        border-radius: 10px;
        width: 100%;
        padding: 10px 20px;
    }
    input:focus, textarea:focus{
        outline: none;
    }
</style>