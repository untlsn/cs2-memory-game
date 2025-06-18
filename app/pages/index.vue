<script setup lang="ts">
import LandingPageDecisionButtons from '~/components/LandingPageDecisionButtons.vue';
import LandingPageGameSettings from '~/components/LandingPageGameSettings.vue';

const seed = ref(0);
const difficulty = ref<GameBoardDifficulty>('medium');

onMounted(() => {
  seed.value = Math.floor(Math.random() * 10 ** 10);
});
</script>

<template>
  <div className="min-h-screen bg-gray-900 text-white">
    <LandingPageHeader />
    <div class="grid md:grid-cols-2 gap-8 p-12">
      <LandingPageGameSettings
        v-model:seed="seed"
        v-model:difficulty="difficulty"
      />
      <LandingPageDecisionButtons
        :seed
        :difficulty
      />
      <ClientOnly><GameBoardLeaderboard /></ClientOnly>
    </div>
  </div>
</template>

<style scoped>
</style>
