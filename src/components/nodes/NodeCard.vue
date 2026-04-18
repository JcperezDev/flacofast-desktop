<template>
  <article class="rounded-md border border-white/10 bg-white/[0.04] p-4">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-bold text-white">{{ node.name }}</h3>
          <span v-if="node.isPrimary" class="rounded-md bg-sky-300/10 px-2 py-1 text-xs font-semibold text-sky-200">Primary</span>
        </div>
        <p class="mt-1 text-sm text-neutral-400">{{ node.host }}:{{ node.port }} · {{ node.region }}</p>
      </div>

      <span
        class="rounded-md border px-2.5 py-1 text-xs font-semibold"
        :class="statusClass"
      >
        {{ node.status }}
      </span>
    </div>

    <div class="mt-5 grid grid-cols-3 gap-2 text-sm">
      <div class="rounded-md bg-neutral-950/60 p-3">
        <p class="text-xs text-neutral-500">Ping</p>
        <p class="mt-1 font-bold text-white">{{ formatMs(node.metrics?.pingMs) }}</p>
      </div>
      <div class="rounded-md bg-neutral-950/60 p-3">
        <p class="text-xs text-neutral-500">Jitter</p>
        <p class="mt-1 font-bold text-white">{{ formatMs(node.metrics?.jitterMs) }}</p>
      </div>
      <div class="rounded-md bg-neutral-950/60 p-3">
        <p class="text-xs text-neutral-500">Loss</p>
        <p class="mt-1 font-bold text-white">{{ formatPct(node.metrics?.packetLossPct) }}</p>
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button class="focus-ring min-h-10 flex-1 rounded-md bg-emerald-300 px-3 text-sm font-bold text-neutral-950 hover:bg-emerald-200" type="button" @click="$emit('select')">
        Use Node
      </button>
      <button class="focus-ring min-h-10 rounded-md border border-white/10 px-3 text-sm font-semibold text-white hover:bg-white/[0.06]" type="button" @click="$emit('test')">
        Test
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Node } from '../../types/node'
import { formatMs, formatPct } from '../../utils/format'

const props = defineProps<{
  node: Node
}>()

defineEmits<{
  select: []
  test: []
}>()

const statusClass = computed(() => {
  if (props.node.status === 'online') return 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200'
  if (props.node.status === 'offline') return 'border-red-300/30 bg-red-300/10 text-red-200'
  return 'border-neutral-700 bg-neutral-900 text-neutral-300'
})
</script>
