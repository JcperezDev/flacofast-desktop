import { invoke } from '@tauri-apps/api/core'

const isTauriRuntime = '__TAURI_INTERNALS__' in window

export async function callNative<T>(command: string, args?: Record<string, unknown>, fallback?: () => Promise<T> | T): Promise<T> {
  if (isTauriRuntime) {
    return invoke<T>(command, args)
  }

  if (!fallback) {
    throw new Error(`Native command "${command}" is only available inside Tauri`)
  }

  return fallback()
}
