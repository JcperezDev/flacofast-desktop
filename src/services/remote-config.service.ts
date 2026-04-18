import type { AppConfig } from '../types/config'
import type { Node } from '../types/node'
import { apiFetch } from './api.service'
import type { AdminNode } from './admin.service'

function toNode(node: AdminNode): Node {
  return {
    id: node.id,
    name: node.name,
    host: node.host,
    port: node.port,
    region: node.region,
    isPrimary: node.isPrimary,
    status: node.status,
  }
}

export async function loadRemoteClientConfig() {
  const result = await apiFetch<{ config: AppConfig; node: AdminNode }>('/api/config/client')
  return {
    config: result.config,
    node: toNode(result.node),
  }
}

export async function loadRemoteNodes() {
  const result = await apiFetch<{ nodes: AdminNode[] }>('/api/nodes')
  return result.nodes.map(toNode)
}
