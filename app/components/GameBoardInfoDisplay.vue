<script setup lang="ts">
const time = '00:00:00';

const props = defineProps<{ moves: number, tiles: GameBoardTile[] }>();

const tilesMatched = computed(() => {
  let count = 0;
  for (const tile of props.tiles) {
    if (tile.isMatched) count++;
  }
  return count / 2;
});
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
        :value="`${tilesMatched} / ${tiles.length / 2}`"
        icon="lucide:check"
        color="var(--color-green-600)"
      />
    </div>
  </div>
</template>
