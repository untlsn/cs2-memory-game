<script setup lang="ts">
const gameStore = useGameStore();

const { seed, difficulty } = gameStore;

if (!seed || !difficulty) navigateTo('/', { replace: true });

navigateTo(`/game/${difficulty}/${seed}`, { replace: true });
</script>

<template>
  <span>Loading last game...</span>
</template>

<style scoped>
</style>
