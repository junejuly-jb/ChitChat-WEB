<script setup>
  import { useDialogStore } from '@/stores/dialog'

  const dialogStore = useDialogStore();
  const emit = defineEmits(['signout'])

</script>

<template>
    <v-dialog
      v-model="dialogStore.unauthenticatedDialog"
      persistent width="500px" height="200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h6">Token Expired</span>
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