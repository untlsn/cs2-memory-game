<script setup lang="ts">
import * as D from 'date-fns';
import { onWatcherCleanup } from 'vue';

const props = defineProps<{ tilesLength: number }>();
const gameStore = useGameStore();

const allTilesMatched = computed(() => gameStore.matched.length == props.tilesLength);

let startTime: Date | undefined;

const durationUnset = computed(() => gameStore.duration == undefined);

watch(() => {
  return durationUnset.value || allTilesMatched.value;
}, (skip) => {
  if (skip) return;

  startTime = D.subSeconds(new Date(), gameStore.duration!);
  const interval = setInterval(gameStore.incrementTimer, 1000);
  const syncInterval = setInterval(() => {
    gameStore.duration = D.differenceInSeconds(new Date(), startTime!);
  }, 10_000);

  onWatcherCleanup(() => {
    clearInterval(interval);
    clearInterval(syncInterval);
  });
}, { immediate: true });

const time = computed(() => formatDuration(durationFromSeconds(gameStore.duration || 0)));
</script>

<template>
  <div class="mb-6 p-4">
    <div class="flex flex-wrap gap-4 mx-auto">
      <GameBoardInfoDisplayCard
        label="Time"
        :value="time"
        icon="lucide:clock"
        color="var(--color-blue-600)"
      />
      <GameBoardInfoDisplayCard
        label="Moves"
        :value="gameStore.moves"
        icon="lucide:mouse-pointer"
        color="var(--color-purple-600)"
      />
      <GameBoardInfoDisplayCard
        label="Pairs Found"
        :value="`${gameStore.matched.length / 2} / ${props.tilesLength / 2}`"
        icon="lucide:check"
        color="var(--color-green-600)"
      />
    </div>
  </div>
</template>
