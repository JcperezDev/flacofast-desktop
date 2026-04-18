import { computed, reactive } from 'vue'
import type { AuthUser } from '../types/auth'
import type { AppConfig } from '../types/config'
import type { Game } from '../types/game'
import type { HistoryEntry } from '../types/history'
import type { Metrics } from '../types/metrics'
import type { Node } from '../types/node'
import type { TunnelState } from '../types/tunnel'
import { defaultConfig, defaultGames, defaultNodes } from '../utils/defaults'
import { scoreMetrics } from '../utils/score'

type AppStore = {
  config: AppConfig
  games: Game[]
  nodes: Node[]
  selectedGameId: string
  selectedNodeId: string
  currentMetrics: Metrics | null
  tunnel: TunnelState
  history: HistoryEntry[]
  currentUser: AuthUser | null
  loading: boolean
  error: string | null
}

const state = reactive<AppStore>({
  config: defaultConfig(),
  games: defaultGames(),
  nodes: defaultNodes(),
  selectedGameId: 'valorant',
  selectedNodeId: 'primary-vps',
  currentMetrics: null,
  tunnel: {
    connected: false,
  },
  history: [],
  currentUser: null,
  loading: false,
  error: null,
})

const selectedGame = computed(() => state.games.find((game) => game.id === state.selectedGameId) ?? state.games[0])
const selectedNode = computed(() => state.nodes.find((node) => node.id === state.selectedNodeId) ?? state.nodes[0])
const currentScore = computed(() => (state.currentMetrics ? scoreMetrics(state.currentMetrics) : null))
const sortedNodes = computed(() =>
  [...state.nodes].sort((left, right) => {
    if (!left.metrics && !right.metrics) return Number(right.isPrimary) - Number(left.isPrimary)
    if (!left.metrics) return 1
    if (!right.metrics) return -1
    return scoreMetrics(left.metrics) - scoreMetrics(right.metrics)
  }),
)

export function useAppStore() {
  return {
    state,
    selectedGame,
    selectedNode,
    currentScore,
    sortedNodes,
  }
}
