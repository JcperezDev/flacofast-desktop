<template>
  <button
    type="button"
    class="focus-ring min-h-36 rounded-md border p-4 text-left transition"
    :class="selected ? 'border-emerald-300/40 bg-emerald-300/10' : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'"
  >
    <span class="block h-1.5 w-14 rounded-full" :style="{ backgroundColor: game.accent }" />
    <span class="mt-4 block text-lg font-bold text-white">{{ game.name }}</span>
    <span class="mt-1 block text-sm text-neutral-400">{{ game.region ?? 'Global routing' }}</span>
    <span class="mt-5 block truncate text-xs text-neutral-500">{{ game.executableName ?? 'Manual selection' }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Game } from '../../types/game'

defineProps<{
  game: Game
  selected: boolean
}>()
</script>
