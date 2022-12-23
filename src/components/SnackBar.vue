<script setup>
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();
</script>
<template>
  <div class="text-center">
    <v-snackbar v-model="appStore.snackbar.status" rounded="pill" :color="appStore.snackbar.type">
      {{ appStore.snackbar.message }}
    </v-snackbar>
  </div>
</template>