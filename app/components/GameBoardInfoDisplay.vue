<script setup lang="ts">
const time = '00:00:00';
const moves = 0;
const tilesMatch = 0;
const allTiles = 0;
</script>

<template>
  <div class="mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
      <GameBoardInfoDisplayCard
        label="Time"
        :value="time"
        icon="lucide:clock"
        color="var(--color-blue-600)"
      />
      <GameBoardInfoDisplayCard
        label="Moves"
        :value="moves"
        icon="lucide:mouse-pointer"
        color="var(--color-purple-600)"
      />
      <GameBoardInfoDisplayCard
        label="Pairs Found"
        :value="`${tilesMatch} / ${allTiles}`"
        icon="lucide:check"
        color="var(--color-green-600)"
      />
    </div>
  </div>
</template>
