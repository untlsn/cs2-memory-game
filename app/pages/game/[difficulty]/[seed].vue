<script setup lang="ts">
const { seed, difficulty } = useGameBoardParams();
</script>

<template>
  <div>
    Your game will start with Seed: <b>{{ seed }}</b> and Difficulty: <b>{{ difficulty }}</b>
  </div>
</template>

<style scoped>
</style>
