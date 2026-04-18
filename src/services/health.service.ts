import type { Node } from '../types/node'
import { runHealthcheck } from './node.service'

export async function refreshNodeHealth(nodes: Node[]) {
  return Promise.all(nodes.map((node) => runHealthcheck(node).catch(() => ({ ...node, status: 'offline' as const }))))
}
