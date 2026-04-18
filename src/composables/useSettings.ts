import { useAppStore } from '../store/app.store'
import type { AppConfig } from '../types/config'
import { saveConfig } from '../services/config.service'
import { validateConfig } from '../utils/validation'

export function useSettings() {
  const { state } = useAppStore()

  async function persistConfig(config: AppConfig) {
    const errors = validateConfig(config)
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors }
    }

    state.config = await saveConfig(config)
    const primaryIndex = state.nodes.findIndex((node) => node.isPrimary)
    if (primaryIndex >= 0) {
      state.nodes[primaryIndex] = {
        ...state.nodes[primaryIndex],
        name: config.nodeName,
        host: config.vpsHost,
        port: config.wireGuardPort,
        region: config.region,
      }
      state.selectedNodeId = state.nodes[primaryIndex].id
    }

    return { ok: true, errors: {} }
  }

  return {
    persistConfig,
  }
}
