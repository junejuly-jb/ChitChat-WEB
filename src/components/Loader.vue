<template>
    <v-progress-circular
    indeterminate
    color="primary"
    ></v-progress-circular>
    <h4>{{title}}</h4>
</template>

<script setup>
    defineProps(['title'])
</script>