<script setup lang="ts">
defineProps<{
  difficulty: string
  seed: number
}>();

const gameStore = useGameStore();
</script>

<template>
  <UiCard class="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
    <UiCardHeader>
      <UiCardTitle class="text-white flex items-center gap-2">
        <NuxtIcon
          name="lucide:play"
          class="text-lg mr-2 text-blue-400"
        />
        Ready to Play?
      </UiCardTitle>
      <UiCardDescription class="text-slate-400">
        Start a new game or continue your progress
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="space-y-4">
      <UiButton
        class="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium text-lg"
        as-child
      >
        <NuxtLink :to="`/game/${difficulty}/${seed}`">
          <NuxtIcon
            name="lucide:play"
            class="text-lg mr-2"
          />
          Start New Game
        </NuxtLink>
      </UiButton>

      <UiButton
        v-if="gameStore.isGameStarted"
        variant="link"
        class="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white border"
        as-child
      >
        <NuxtLink to="/game/restore">
          <NuxtIcon
            name="lucide:rotate-ccw"
            class="text-lg mr-2"
          />
          Restore Last Game
        </NuxtLink>
      </UiButton>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>
</style>
