<template>
  <div class="rounded-md border border-white/10 bg-white/[0.04] p-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-base font-bold text-white">Latency Trend</h2>
      <span class="text-xs text-neutral-500">Last {{ points.length }} tests</span>
    </div>

    <svg class="mt-5 h-48 w-full overflow-visible" :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Latency chart">
      <line x1="0" :y1="height - 18" :x2="width" :y2="height - 18" stroke="rgba(255,255,255,.12)" />
      <polyline
        v-if="polyline"
        :points="polyline"
        fill="none"
        stroke="#34d399"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle v-for="point in plotted" :key="point.id" :cx="point.x" :cy="point.y" r="4" fill="#f8fafc" />
      <text v-if="points.length === 0" :x="width / 2" :y="height / 2" text-anchor="middle" fill="#737373" font-size="14">No tests yet</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HistoryEntry } from '../../types/history'

const props = defineProps<{
  entries: HistoryEntry[]
}>()

const width = 640
const height = 220

const points = computed(() => props.entries.slice(0, 10).reverse())
const maxPing = computed(() => Math.max(80, ...points.value.map((entry) => entry.after.pingMs)))
const plotted = computed(() =>
  points.value.map((entry, index) => {
    const x = points.value.length === 1 ? width / 2 : (index / (points.value.length - 1)) * width
    const y = height - 18 - (entry.after.pingMs / maxPing.value) * (height - 44)
    return { id: entry.id, x, y }
  }),
)
const polyline = computed(() => plotted.value.map((point) => `${point.x},${point.y}`).join(' '))
</script>
