<script setup lang="ts">
defineProps<{
  label: string
  description: string
  icon: string
  selected: boolean
}>();

defineEmits<{
  (e: 'click'): void
}>();
</script>

<template>
  <button
    class="p-4 rounded-lg border-2 transition-all text-left"
    :class="
      selected
        ? 'border-orange-500 bg-orange-500/10'
        : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
    "
    @click="$emit('click')"
  >
    <div class="flex items-center gap-3">
      <div
        :class="[
          'p-2 rounded',
          selected
            ? 'bg-orange-500/20'
            : 'bg-slate-600/50',
        ]"
      >
        <NuxtIcon
          :name="icon"
          class="text-white"
        />
      </div>
      <div>
        <div
          :class="[
            'font-medium',
            selected
              ? 'text-orange-300'
              : 'text-white',
          ]"
        >
          {{ label }}
        </div>
        <div class="text-sm text-slate-400">
          {{ description }}
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
</style>
