<script setup lang="ts">
import * as D from 'date-fns';

const gameStore = useGameStore();

const durationString = D.formatDuration(
  durationTillNow(gameStore.time),
  { format: ['hours', 'minutes', 'seconds'] },
);

const leaderboardStore = useLeaderboardStore();

const save = () => {
  const leaderboardElement = gameStore.getLeaderboardElement();

  if (leaderboardElement) leaderboardStore.leaderboard.push(
    leaderboardElement,
  );

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
        You found all pairs in {{ gameStore.moves }} moves and {{ durationString }}.
        <span
          v-if="gameStore.cheatMode"
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
