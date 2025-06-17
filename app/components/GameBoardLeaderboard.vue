<script setup lang="ts">
const leaderboardStore = useLeaderboardStore();

watchEffect(() => {
  console.log(leaderboardStore.leaderboard);
});
</script>

<template>
  <UiCard class="bg-slate-800/50 border-slate-700 backdrop-blur-sm col-span-full">
    <UiCardHeader>
      <UiCardTitle
        class="text-white text-center flex items-center justify-center gap-2"
      >
        <NuxtIcon
          name="lucide:trophy"
          class="text-lg text-yellow-400"
        />
        Personal Leaderboard
      </UiCardTitle>
      <UiCardDescription class="text-slate-400 text-center">
        Your best performances across all difficulties
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div
        v-if="leaderboardStore.leaderboard.length === 0"
        class="text-center py-8 text-slate-500"
      >
        <NuxtIcon
          name="lucide:medal"
          class="text-xl mx-auto mb-3"
        />
        <p class="text-slate-400">
          No games played yet!
        </p>
        <p class="text-sm">
          Start playing to see your records here
        </p>
      </div>
      <div
        v-else
        class="space-y-3"
      >
        <div
          v-for="(record, index) in leaderboardStore.leaderboard"
          :key="index"
          class="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors"
        >
          <div class="flex-shrink-0">
            <div
              v-if="index < 3"
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                index === 0
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : index === 1
                    ? 'bg-gray-400/20 text-gray-300'
                    : 'bg-orange-500/20 text-orange-300',
              ]"
            >
              {{ index + 1 }}
            </div>
            <div
              v-else
              class="w-8 h-8 rounded-full bg-slate-600/50 flex items-center justify-center text-slate-400 text-sm font-medium"
            >
              {{ index + 1 }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <UiBadge
                variant="secondary"
              >
                <span class="ml-1 capitalize">{{ record.difficulty }}</span>
              </UiBadge>
              <UiBadge
                v-if="record.seed"
                variant="outline"
                class="border-slate-600 text-slate-400 text-xs"
              >
                Seed: {{ record.seed }}
              </UiBadge>
            </div>
            <div class="text-xs text-slate-400">
              {{ record.date }}
            </div>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-center">
              <div class="text-white font-medium flex items-center gap-1">
                <NuxtIcon name="lucide:clock" />
                {{ record.time }}
              </div>
              <div class="text-xs text-slate-400">
                Time
              </div>
            </div>
            <div class="text-center">
              <div class="text-white font-medium">
                {{ record.moves }}
              </div>
              <div class="text-xs text-slate-400">
                Moves
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>
</style>
