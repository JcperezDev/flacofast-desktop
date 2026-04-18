import type { Metrics } from './metrics'

export type HistoryEntry = {
  id: string
  testedAt: string
  gameId: string
  gameName: string
  nodeId: string
  nodeName: string
  before?: Metrics
  after: Metrics
  result: 'improved' | 'worse' | 'stable'
}
