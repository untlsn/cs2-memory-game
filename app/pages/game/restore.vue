<script setup lang="ts">
const gameStore = useGameStore();

const { seed, difficulty } = gameStore;

if (!seed || !difficulty) navigateTo('/');

navigateTo(`/game/${difficulty}/${seed}`);
</script>

<template>
  <span>Loading last game...</span>
</template>

<style scoped>
</style>
