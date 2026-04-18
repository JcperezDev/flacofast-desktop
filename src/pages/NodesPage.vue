<template>
  <section class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase text-emerald-300">Routing</p>
        <h1 class="mt-2 text-3xl font-black text-white">Nodes</h1>
      </div>
      <button class="focus-ring min-h-12 rounded-md border border-white/10 bg-white/[0.04] px-5 text-sm font-bold text-white hover:bg-white/[0.08]" type="button" @click="refreshHealth">
        Healthcheck
      </button>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <NodeCard
        v-for="node in sortedNodes"
        :key="node.id"
        :node="node"
        @select="state.selectedNodeId = node.id"
        @test="testNode(node.id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NodeCard from '../components/nodes/NodeCard.vue'
import { refreshNodeHealth } from '../services/health.service'
import { runLatencyTest } from '../services/latency.service'
import { loadRemoteNodes } from '../services/remote-config.service'
import { useAppStore } from '../store/app.store'

const { state, sortedNodes } = useAppStore()

onMounted(async () => {
  if (!state.currentUser) return

  try {
    const nodes = await loadRemoteNodes()
    if (nodes.length > 0) {
      state.nodes = nodes
      state.selectedNodeId = nodes.find((node) => node.isPrimary)?.id ?? nodes[0].id
    }
  } catch {
    // Keep local nodes available when the remote API cannot be reached.
  }
})

async function testNode(nodeId: string) {
  const index = state.nodes.findIndex((node) => node.id === nodeId)
  if (index < 0) return

  state.loading = true
  try {
    const metrics = await runLatencyTest(state.nodes[index])
    state.nodes[index] = { ...state.nodes[index], metrics, status: 'online' }
  } finally {
    state.loading = false
  }
}

async function refreshHealth() {
  state.loading = true
  try {
    state.nodes = await refreshNodeHealth(state.nodes)
  } finally {
    state.loading = false
  }
}
</script>
