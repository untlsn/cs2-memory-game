<script setup lang="ts">
import { onWatcherCleanup } from 'vue';
import * as D from 'date-fns';

const props = defineProps<{ moves: number, tilesLength: number, timeStart?: Date, tilesMatched: number }>();

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

const time = computed(() => {
  if (props.tilesMatched != props.tilesLength / 2) void metronome.value;

  const timeStart = props.timeStart;
  if (!timeStart) return '00:00:00';

  return formatDuration(
    D.intervalToDuration({
      start: timeStart,
      end: new Date(),
    }),
  );
});
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
        :value="moves"
        icon="lucide:mouse-pointer"
        color="var(--color-purple-600)"
      />
      <GameBoardInfoDisplayCard
        label="Pairs Found"
        :value="`${props.tilesMatched} / ${props.tilesLength / 2}`"
        icon="lucide:check"
        color="var(--color-green-600)"
      />
    </div>
  </div>
</template>
