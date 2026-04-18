<template>
  <section class="mx-auto max-w-7xl">
    <div>
      <p class="text-sm font-semibold uppercase text-emerald-300">Before / after</p>
      <h1 class="mt-2 text-3xl font-black text-white">History</h1>
    </div>

    <div class="mt-6 overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
      <div class="grid grid-cols-[1.1fr_.9fr_.9fr_.7fr_.7fr_.7fr_.8fr] gap-3 border-b border-white/10 px-4 py-3 text-xs font-bold uppercase text-neutral-500 max-lg:hidden">
        <span>Date</span>
        <span>Game</span>
        <span>Node</span>
        <span>Ping</span>
        <span>Jitter</span>
        <span>Loss</span>
        <span>Result</span>
      </div>

      <div v-if="state.history.length === 0" class="p-8 text-center text-neutral-400">No tests have been saved yet.</div>

      <div
        v-for="entry in state.history"
        :key="entry.id"
        class="grid gap-2 border-b border-white/5 px-4 py-4 text-sm text-neutral-300 last:border-b-0 lg:grid-cols-[1.1fr_.9fr_.9fr_.7fr_.7fr_.7fr_.8fr] lg:items-center"
      >
        <span>{{ formatDateTime(entry.testedAt) }}</span>
        <span class="font-semibold text-white">{{ entry.gameName }}</span>
        <span>{{ entry.nodeName }}</span>
        <span>{{ formatMs(entry.after.pingMs) }}</span>
        <span>{{ formatMs(entry.after.jitterMs) }}</span>
        <span>{{ formatPct(entry.after.packetLossPct) }}</span>
        <span class="w-fit rounded-md px-2.5 py-1 text-xs font-bold" :class="resultClass(entry.result)">{{ entry.result }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { loadHistory } from '../services/config.service'
import { useAppStore } from '../store/app.store'
import { formatDateTime, formatMs, formatPct } from '../utils/format'

const { state } = useAppStore()

onMounted(async () => {
  state.history = await loadHistory()
})

function resultClass(result: string) {
  if (result === 'improved') return 'bg-emerald-300/10 text-emerald-200'
  if (result === 'worse') return 'bg-red-300/10 text-red-200'
  return 'bg-neutral-800 text-neutral-300'
}
</script>
