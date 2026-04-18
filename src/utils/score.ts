import type { Metrics } from '../types/metrics'

export function scoreMetrics(metrics: Metrics) {
  return metrics.pingMs * 0.6 + metrics.jitterMs * 0.3 + metrics.packetLossPct * 0.1
}

export function compareMetrics(before: Metrics | undefined, after: Metrics): 'improved' | 'worse' | 'stable' {
  if (!before) return 'stable'

  const delta = scoreMetrics(after) - scoreMetrics(before)
  if (delta < -3) return 'improved'
  if (delta > 3) return 'worse'
  return 'stable'
}
