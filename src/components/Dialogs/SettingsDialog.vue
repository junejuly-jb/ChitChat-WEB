<script setup>
    import { useDialogStore } from '@/stores/dialog';
import { ref } from 'vue';

    const dialogStore = useDialogStore();
    
    const toggler = ref(false)
    const step = ref(1)
    
</script>

<template>
    <v-dialog
    v-model="dialogStore.settingsDialog"
    persistent width="400px" height="300px"
    >
        <v-card class="rounded-xl">
            <v-card-title>
                <div class="d-flex">
                    <span class="text-h5">Settings</span>
                    <v-spacer></v-spacer>
                    <v-btn variant="flat" size="small" icon @click="dialogStore.dialogHandler({ state:'settingsDialog', value: false })">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <div @click="step++" class="d-flex align-center my-2 pointer">
                            <span>Profile</span>
                        </div>
                        <div class="d-flex align-center">
                            <span>Dark mode</span>
                            <v-spacer></v-spacer>
                            <div>
                                <v-switch color="blue" v-model="toggler" inset hide-details></v-switch>
                            </div>
                        </div>
                        <div @click="step++" class="d-flex align-center my-2 pointer">
                            <span>Logout</span>
                        </div>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-btn variant="flat" icon size="small" @click="step--">
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-container>test</v-container>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style>
    .pointer{
        cursor: pointer;
    }
</style>