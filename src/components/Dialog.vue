<script setup>
import { useUserStore } from '../stores/user';

    const userStore = useUserStore()
    const dialog = userStore.unauthenticated
    const emit = defineEmits(['signout'])

</script>

<template>

    <v-dialog
      v-model="dialog"
      persistent width="500px" height="200px"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Open Dialog
        </v-btn>
      </template>
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