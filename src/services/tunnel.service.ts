import type { AppConfig } from '../types/config'
import type { Node } from '../types/node'
import type { TunnelState } from '../types/tunnel'
import { callNative } from './tauri.service'

export async function connectTunnel(config: AppConfig, node: Node): Promise<TunnelState> {
  return callNative<TunnelState>('connect_tunnel', { config, node }, async () => ({
    connected: true,
    nodeId: node.id,
    interfaceName: config.interfaceName,
    lastHandshake: new Date().toISOString(),
  }))
}

export async function disconnectTunnel(interfaceName: string): Promise<TunnelState> {
  return callNative<TunnelState>('disconnect_tunnel', { interfaceName }, async () => ({
    connected: false,
    interfaceName,
  }))
}

export async function getTunnelStatus(interfaceName: string): Promise<TunnelState> {
  return callNative<TunnelState>('get_tunnel_status', { interfaceName }, async () => ({
    connected: false,
    interfaceName,
  }))
}
