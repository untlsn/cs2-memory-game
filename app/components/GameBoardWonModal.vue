<script setup lang="ts">
import * as D from 'date-fns';

const props = defineProps<{ moves: number, time: Date, cheatMode: boolean }>();

const duration = D.intervalToDuration({
  start: props.time,
  end: new Date(),
});
const durationString = D.formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] });

const { seed, difficulty } = useGameBoardParams();

const leaderboardStore = useLeaderboardStore();

const save = () => {
  if (!props.cheatMode) leaderboardStore.leaderboard.push({
    seed,
    difficulty,
    moves: props.moves,
    time: formatDuration(duration),
    date: D.format(new Date(), 'yyyy-MM-dd HH:mm'),
  });

  navigateTo('/');
};
</script>

<template>
  <UiDialog
    modal
    open
  >
    <UiDialogContent>
      <UiDialogTitle>
        You won!
      </UiDialogTitle>
      <UiDialogDescription>
        You found all pairs in {{ moves }} moves and {{ durationString }}.
        <span
          v-if="cheatMode"
          class="text-red-500"
        >
          But you've toggled cheat mode on, so your game score won't be saved.
        </span>
      </UiDialogDescription>
      <UiDialogFooter>
        <UiButton
          variant="secondary"
          @click="save"
        >
          Go to main page
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped>
</style>
