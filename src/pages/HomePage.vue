<template>
  <section class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase text-primary">Optimizador VPN</p>
        <h1 class="mt-2 text-3xl font-black text-text-primary sm:text-4xl">Control de Rutas</h1>
      </div>
      <div class="flex flex-wrap gap-2">
        <ConnectionButton v-if="!state.tunnel.connected" variant="connect" :disabled="state.loading" @click="connect">Conectar</ConnectionButton>
        <ConnectionButton v-else variant="disconnect" :disabled="state.loading" @click="disconnect">Desconectar</ConnectionButton>
        <button class="focus-ring min-h-12 rounded-md border border-border bg-neutral px-5 text-sm font-bold text-text-primary hover:bg-base disabled:opacity-60 transition-colors" type="button" :disabled="state.loading" @click="runTest">
          Hacer Test
        </button>
      </div>
    </div>

    <p v-if="state.error" class="mt-5 rounded-md border border-error/20 bg-error/10 p-3 text-sm text-error">{{ state.error }}</p>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Túnel" :value="state.tunnel.connected ? 'Online' : 'Offline'" :hint="selectedNode.name" />
      <MetricCard label="Ping" :value="formatMs(state.currentMetrics?.pingMs)" :hint="scoreHint" />
      <MetricCard label="Jitter" :value="formatMs(state.currentMetrics?.jitterMs)" hint="Estabilidad" />
      <MetricCard label="Pérdida de Paquetes" :value="formatPct(state.currentMetrics?.packetLossPct)" hint="Objetivo 0%" />
    </div>

    <div class="mt-6 grid gap-4 xl:grid-cols-[1fr_22rem]">
      <LatencyChart :entries="state.history" />

      <aside class="rounded-md border border-border bg-neutral p-4">
        <h2 class="text-base font-bold text-text-primary">Ruta Activa</h2>
        <div class="mt-4 space-y-4">
          <div>
            <p class="text-xs uppercase text-text-secondary">Juego</p>
            <p class="mt-1 text-lg font-bold text-text-primary">{{ selectedGame.name }}</p>
          </div>
          <div>
            <p class="text-xs uppercase text-text-secondary">Nodo</p>
            <p class="mt-1 text-lg font-bold text-text-primary">{{ selectedNode.name }}</p>
            <p class="text-sm text-text-secondary">{{ selectedNode.host }} · {{ selectedNode.region }}</p>
          </div>
          <div>
            <p class="text-xs uppercase text-text-secondary">Interfaz</p>
            <p class="mt-1 text-sm font-semibold text-text-primary">{{ state.tunnel.interfaceName ?? state.config.interfaceName }}</p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ConnectionButton from '../components/common/ConnectionButton.vue'
import MetricCard from '../components/cards/MetricCard.vue'
import LatencyChart from '../components/charts/LatencyChart.vue'
import { useNetworkTest } from '../composables/useNetworkTest'
import { useTunnel } from '../composables/useTunnel'
import { loadConfig, loadHistory } from '../services/config.service'
import { loadRemoteClientConfig } from '../services/remote-config.service'
import { useAppStore } from '../store/app.store'
import { formatMs, formatPct } from '../utils/format'

const { state, selectedGame, selectedNode, currentScore } = useAppStore()
const { runTest } = useNetworkTest()
const { connect, disconnect, refreshStatus } = useTunnel()

const scoreHint = computed(() => (currentScore.value === null ? 'Sin score' : `Score ${currentScore.value.toFixed(1)}`))

onMounted(async () => {
  state.config = await loadConfig()
  if (state.currentUser) {
    try {
      const remote = await loadRemoteClientConfig()
      state.config = { ...state.config, ...remote.config }
      const index = state.nodes.findIndex((node) => node.isPrimary)
      if (index >= 0) {
        state.nodes[index] = remote.node
      } else {
        state.nodes.unshift(remote.node)
      }
      state.selectedNodeId = remote.node.id
    } catch {
      // The desktop can still run with local config when the remote API is offline.
    }
  }
  state.history = await loadHistory()
  await refreshStatus()
})
</script>
