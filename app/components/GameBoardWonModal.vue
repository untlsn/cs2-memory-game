<script setup lang="ts">
import * as D from 'date-fns';

const props = defineProps<{ moves: number, time: Date }>();

const duration = D.intervalToDuration({
  start: props.time,
  end: new Date(),
});
const durationString = D.formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] });

console.log('uwu');
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
      </UiDialogDescription>
      <UiDialogFooter>
        <UiButton
          variant="secondary"
          as-child
        >
          <NuxtLink to="/">
            Go to main page
          </NuxtLink>
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped>
</style>
