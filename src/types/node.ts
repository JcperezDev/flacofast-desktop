import type { Metrics } from './metrics'

export type NodeStatus = 'online' | 'offline' | 'unknown'

export type Node = {
  id: string
  name: string
  host: string
  port: number
  region: string
  isPrimary: boolean
  status: NodeStatus
  metrics?: Metrics
}
