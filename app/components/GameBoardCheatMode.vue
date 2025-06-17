<script setup lang="ts">
const closed = ref(false);

const gameStore = useGameStore();

const dialogOpen = computed(() => {
  return gameStore.cheatMode && !closed.value;
});
</script>

<template>
  <UiDialog
    :open="dialogOpen"
    @update:open="closed = true"
  >
    <UiDialogContent>
      <UiDialogTitle>
        Cheat mode
      </UiDialogTitle>
      <UiDialogDescription>
        You've just toggled cheat mode on. You can see all the cards but your game won't be saved.
      </UiDialogDescription>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped>
</style>
