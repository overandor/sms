export type LatencySnapshot = {
  claimLatencyMs: number
  settlementLatencyMs: number
  smsDispatchLatencyMs: number
  measuredAt: string
}

export function measureLatency(): LatencySnapshot {
  return {
    claimLatencyMs: Math.floor(Math.random() * 120),
    settlementLatencyMs: Math.floor(Math.random() * 500),
    smsDispatchLatencyMs: Math.floor(Math.random() * 300),
    measuredAt: new Date().toISOString()
  }
}
