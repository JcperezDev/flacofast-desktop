import { useAppStore } from '../store/app.store'
import { connectTunnel, disconnectTunnel, getTunnelStatus } from '../services/tunnel.service'

export function useTunnel() {
  const { state, selectedNode } = useAppStore()

  async function connect() {
    state.loading = true
    state.error = null

    try {
      state.tunnel = await connectTunnel(state.config, selectedNode.value)
    } catch (error) {
      state.error = error instanceof Error ? error.message : 'Tunnel connection failed'
    } finally {
      state.loading = false
    }
  }

  async function disconnect() {
    state.loading = true
    state.error = null

    try {
      state.tunnel = await disconnectTunnel(state.config.interfaceName)
    } catch (error) {
      state.error = error instanceof Error ? error.message : 'Tunnel disconnect failed'
    } finally {
      state.loading = false
    }
  }

  async function refreshStatus() {
    try {
      state.tunnel = await getTunnelStatus(state.config.interfaceName)
    } catch {
      state.tunnel = { connected: false, interfaceName: state.config.interfaceName }
    }
  }

  return {
    connect,
    disconnect,
    refreshStatus,
  }
}
