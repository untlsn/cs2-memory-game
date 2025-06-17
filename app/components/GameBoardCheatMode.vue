<script setup lang="ts">
const closed = ref(false);

const props = defineProps<{
  open: boolean
}>();

const dialogOpen = computed(() => {
  return props.open && !closed.value;
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
