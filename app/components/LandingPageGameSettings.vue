<script setup lang="ts">
const seed = defineModel<number>('seed');
const difficulty = defineModel<GameBoardDifficulty>('difficulty');
</script>

<template>
  <UiCard class="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
    <UiCardHeader>
      <UiCardTitle class="text-white flex items-center gap-2">
        <NuxtIcon
          name="lucide:zap"
          class="text-lg mr-2 text-orange-400"
        />
        Game Settings
      </UiCardTitle>
      <UiCardDescription class="text-slate-400">
        Configure your memory challenge
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="space-y-6">
      <div class="space-y-3">
        <UiLabel class="text-white font-medium">
          Difficulty Level
        </UiLabel>
        <div class="grid gap-3">
          <LandingPageDifficultyOptionButton
            label="Easy"
            description="4x4 Grid • 8 Pairs"
            icon="lucide:target"
            :selected="difficulty === 'easy'"
            @click="difficulty = 'easy'"
          />
          <LandingPageDifficultyOptionButton
            label="Medium"
            description="6x6 Grid • 18 Pairs"
            icon="lucide:zap"
            :selected="difficulty === 'medium'"
            @click="difficulty = 'medium'"
          />
          <LandingPageDifficultyOptionButton
            label="Hard"
            description="8x8 Grid • 32 Pairs"
            icon="lucide:gamepad-2"
            :selected="difficulty === 'hard'"
            @click="difficulty = 'hard'"
          />
        </div>
      </div>

      <div class="space-y-2">
        <UiLabel
          for="seed"
          class="text-white font-medium"
        >
          <NuxtIcon
            name="lucide:bean"
            class="text-lg mr-2 text-green-400"
          />
          Game Seed
        </UiLabel>
        <UiInput
          id="seed"
          v-model="seed"
          placeholder="Enter custom seed for reproducible games"
          class="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500"
        />
        <p class="text-xs text-slate-400">
          Use the same seed to replay identical weapon layouts
        </p>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>
</style>
