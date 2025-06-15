<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  icon: string
  color: string
}>();
</script>

<template>
  <UiCard
    :style="{ '--card-color': color }"
    class="bg-gray-800 border-gray-700"
  >
    <UiCardContent class="p-4">
      <div class="flex items-center gap-3">
        <div class="size-10 bg-(--card-color) rounded-lg flex items-center justify-center">
          <NuxtIcon
            :name="icon"
            class="text-white text-xl"
          />
        </div>
        <div>
          <p class="text-sm text-gray-400">
            {{ label }}
          </p>
          <p class="text-xl font-bold text-(--card-color)">
            {{ value }}
          </p>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>
</style>
