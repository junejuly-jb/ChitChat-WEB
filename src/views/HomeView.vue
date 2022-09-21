<script setup>
  import pusher from '../pusher'
  import { useUserStore } from '@/stores/user';
  import { ref, watch } from 'vue';

  const userStore = useUserStore()

  const searchTerm = ref('')

  var channel = pusher.subscribe('chitchat-registration');
  channel.bind('new-user', function(data) {
    userStore.addUser(data.data)
  });
</script>

<template>
  <main>
    <h1>Home</h1>
    <input v-model="searchTerm">
    <div>{{ searchTerm }}</div>
    <div v-for="user in userStore.getUserByName(searchTerm.toLowerCase())" :key="user._id">
      <div>{{ user._id }} ---> {{ user.name }} {{ user.email }}</div>
    </div>

    <button @click="userStore.addUser">add</button>
  </main>
</template>
