import type { AppConfig } from '../types/config'
import type { Game } from '../types/game'
import type { Node } from '../types/node'

export function defaultConfig(): AppConfig {
  return {
    vpsHost: '203.0.113.10',
    wireGuardPort: 51820,
    serverPublicKey: '',
    dns: '1.1.1.1',
    nodeName: 'Main VPS',
    region: 'US East',
    autoConnect: false,
    interfaceName: 'flacofast0',
    clientAddress: '10.8.0.2/32',
    allowedIps: '0.0.0.0/0, ::/0',
  }
}

export function defaultGames(): Game[] {
  return [
    { id: 'fortnite', name: 'Fortnite', executableName: 'FortniteClient-Win64-Shipping.exe', region: 'NA East', accent: '#22c55e' },
    { id: 'valorant', name: 'Valorant', executableName: 'VALORANT-Win64-Shipping.exe', region: 'NA', accent: '#ff4655' },
    { id: 'warzone', name: 'Warzone', executableName: 'cod.exe', region: 'NA', accent: '#f59e0b' },
    { id: 'apex', name: 'Apex Legends', executableName: 'r5apex.exe', region: 'NA', accent: '#ef4444' },
    { id: 'league', name: 'League of Legends', executableName: 'LeagueClient.exe', region: 'LAN', accent: '#38bdf8' },
    { id: 'cs2', name: 'Counter-Strike 2', executableName: 'cs2.exe', region: 'NA', accent: '#f97316' },
  ]
}

export function defaultNodes(): Node[] {
  return [
    {
      id: 'primary-vps',
      name: 'Main VPS',
      host: '203.0.113.10',
      port: 51820,
      region: 'US East',
      isPrimary: true,
      status: 'unknown',
    },
  ]
}
