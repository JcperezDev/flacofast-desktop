import type { AppConfig } from '../types/config'

export function validateConfig(config: AppConfig) {
  const errors: Partial<Record<keyof AppConfig, string>> = {}

  if (!config.vpsHost.trim()) errors.vpsHost = 'Host is required'
  if (!Number.isInteger(config.wireGuardPort) || config.wireGuardPort < 1 || config.wireGuardPort > 65535) {
    errors.wireGuardPort = 'Use a UDP port between 1 and 65535'
  }
  if (!config.dns.trim()) errors.dns = 'DNS is required'
  if (!config.nodeName.trim()) errors.nodeName = 'Node name is required'
  if (!config.region.trim()) errors.region = 'Region is required'
  if (!config.interfaceName.trim()) errors.interfaceName = 'Interface name is required'

  return errors
}
