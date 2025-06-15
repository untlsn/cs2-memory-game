<script setup lang="ts">
import { onWatcherCleanup } from 'vue';
import * as D from 'date-fns';

const props = defineProps<{ moves: number, tiles: GameBoardTile[], timeStart?: Date }>();

const tilesMatched = computed(() => {
  let count = 0;
  for (const tile of props.tiles) {
    if (tile.isMatched) count++;
  }
  return count / 2;
});

const metronome = ref(false);

watchEffect(() => {
  if (!props.timeStart) return;
  const interval = setInterval(() => {
    metronome.value = !metronome.value;
  }, 1000);
  onWatcherCleanup(() => {
    clearInterval(interval);
  });
});

const formatNumber = (num: number | undefined) => {
  num ||= 0;
  return num.toString().padStart(2, '0');
};

const time = computed(() => {
  void metronome.value;

  const timeStart = props.timeStart;
  if (!timeStart) return '00:00:00';

  const duration = D.intervalToDuration({
    start: timeStart,
    end: new Date(),
  });

  return `${formatNumber(duration.hours)}:${formatNumber(duration.minutes)}:${formatNumber(duration.seconds)}`;
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
