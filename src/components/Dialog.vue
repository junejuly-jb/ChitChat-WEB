<script setup>
import { useErrorStore } from '../stores/error';

    const errorStore = useErrorStore();
    const emit = defineEmits(['signout'])

</script>

<template>
    <v-dialog
      v-model="errorStore.unauthenticated"
      persistent width="500px" height="200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Token Expired</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            Session is expired please login again.
          </v-container>
        </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                    @click="emit('signout')"
                >
                    Logout
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>