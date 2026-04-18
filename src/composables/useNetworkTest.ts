import { useAppStore } from '../store/app.store'
import type { HistoryEntry } from '../types/history'
import { saveHistory } from '../services/config.service'
import { runLatencyTest } from '../services/latency.service'
import { compareMetrics } from '../utils/score'

export function useNetworkTest() {
  const { state, selectedGame, selectedNode } = useAppStore()

  async function runTest() {
    state.loading = true
    state.error = null

    try {
      const before = state.currentMetrics ?? undefined
      const metrics = await runLatencyTest(selectedNode.value)
      state.currentMetrics = metrics

      const nodeIndex = state.nodes.findIndex((node) => node.id === selectedNode.value.id)
      if (nodeIndex >= 0) {
        state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], metrics, status: 'online' }
      }

      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        testedAt: metrics.testedAt,
        gameId: selectedGame.value.id,
        gameName: selectedGame.value.name,
        nodeId: selectedNode.value.id,
        nodeName: selectedNode.value.name,
        before,
        after: metrics,
        result: compareMetrics(before, metrics),
      }

      state.history = [entry, ...state.history].slice(0, 100)
      await saveHistory(state.history)
    } catch (error) {
      state.error = error instanceof Error ? error.message : 'Network test failed'
    } finally {
      state.loading = false
    }
  }

  return {
    runTest,
  }
}
