<script setup>
    defineProps(['dialog'])
</script>

//TODO: fix error on non element root node

<template>
    <v-dialog
      v-model="dialog"
      persistent width="500px" height="300px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Delete</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            Are you sure to delete this conversation? This cannot be undone.
          </v-container>
        </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="red"
                    text
                >
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>