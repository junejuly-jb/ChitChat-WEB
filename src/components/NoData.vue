<template>
    <div>
        <v-icon :icon="icon" size="50" class="text-center"></v-icon>
    </div>
    <h3>{{title}}</h3>
</template>

<script setup>
    defineProps(['title','icon'])
</script>