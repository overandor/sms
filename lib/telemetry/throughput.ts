export type ThroughputSnapshot = {
  claimsPerMinute: number
  settlementsPerMinute: number
  activeMerchants: number
  measuredAt: string
}

export function captureThroughputSnapshot(): ThroughputSnapshot {
  return {
    claimsPerMinute: Math.floor(Math.random() * 2000),
    settlementsPerMinute: Math.floor(Math.random() * 600),
    activeMerchants: Math.floor(Math.random() * 1200),
    measuredAt: new Date().toISOString()
  }
}
