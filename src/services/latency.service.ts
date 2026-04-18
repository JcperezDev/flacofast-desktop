import type { Metrics } from '../types/metrics'
import type { Node } from '../types/node'
import { callNative } from './tauri.service'

const jitterSeed = [12, 9, 7, 11, 8]

export async function runLatencyTest(node: Node): Promise<Metrics> {
  return callNative<Metrics>('run_latency_test', { host: node.host, count: 5 }, async () => mockMetrics(node))
}

export async function runJitterTest(node: Node): Promise<number> {
  return callNative<number>('run_jitter_test', { host: node.host, count: 5 }, async () => mockMetrics(node).jitterMs)
}

export async function runPacketLossTest(node: Node): Promise<number> {
  return callNative<number>('run_packet_loss_test', { host: node.host, count: 5 }, async () => mockMetrics(node).packetLossPct)
}

function mockMetrics(node: Node): Metrics {
  const now = new Date()
  const hostWeight = [...node.host].reduce((total, char) => total + char.charCodeAt(0), 0) % 28
  const minuteNoise = now.getMinutes() % 9
  const pingMs = 34 + hostWeight + minuteNoise
  const jitterMs = jitterSeed[now.getSeconds() % jitterSeed.length]
  const packetLossPct = hostWeight > 22 ? 0.8 : 0

  return {
    pingMs,
    jitterMs,
    packetLossPct,
    testedAt: now.toISOString(),
  }
}
