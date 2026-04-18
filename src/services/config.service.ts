import type { AppConfig } from '../types/config'
import type { HistoryEntry } from '../types/history'
import { defaultConfig } from '../utils/defaults'
import { apiFetch, hasAuthToken } from './api.service'
import { callNative } from './tauri.service'

const configKey = 'flacofast.config'
const historyKey = 'flacofast.history'

export async function loadConfig(): Promise<AppConfig> {
  return callNative<AppConfig>('load_config', undefined, async () => {
    const stored = localStorage.getItem(configKey)
    return stored ? { ...defaultConfig(), ...JSON.parse(stored) } : defaultConfig()
  })
}

export async function saveConfig(config: AppConfig): Promise<AppConfig> {
  return callNative<AppConfig>('save_config', { config }, async () => {
    localStorage.setItem(configKey, JSON.stringify(config))
    return config
  })
}

export async function loadHistory(): Promise<HistoryEntry[]> {
  if (hasAuthToken()) {
    try {
      const result = await apiFetch<{ entries: Array<HistoryEntry & { nodeId: string | null }> }>('/api/history')
      return result.entries.map((entry) => ({ ...entry, nodeId: entry.nodeId ?? 'remote-node' }))
    } catch {
      // Local history remains available when the desktop is offline.
    }
  }

  return callNative<HistoryEntry[]>('load_history', undefined, async () => {
    const stored = localStorage.getItem(historyKey)
    return stored ? JSON.parse(stored) : []
  })
}

export async function saveHistory(entries: HistoryEntry[]): Promise<HistoryEntry[]> {
  if (hasAuthToken() && entries[0]) {
    const latest = entries[0]
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    try {
      await apiFetch('/api/history', {
        method: 'POST',
        body: {
          gameId: latest.gameId,
          gameName: latest.gameName,
          nodeId: uuidPattern.test(latest.nodeId) ? latest.nodeId : undefined,
          nodeName: latest.nodeName,
          before: latest.before,
          after: latest.after,
          result: latest.result,
          testedAt: latest.testedAt,
        },
      })
    } catch {
      // Keep saving locally even if the remote API is unavailable.
    }
  }

  return callNative<HistoryEntry[]>('save_history', { entries }, async () => {
    localStorage.setItem(historyKey, JSON.stringify(entries))
    return entries
  })
}
