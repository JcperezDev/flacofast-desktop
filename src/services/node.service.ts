import type { Node } from '../types/node'
import { callNative } from './tauri.service'

export async function runHealthcheck(node: Node): Promise<Node> {
  return callNative<Node>('run_healthcheck', { node }, async () => ({
    ...node,
    status: node.host && node.host !== '203.0.113.10' ? 'online' : 'unknown',
  }))
}
