// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type SettlementRoute = {
  routeId: string
  network: 'solana'
  transport: 'sms' | 'qr' | 'nfc'
  priority: 'low' | 'standard' | 'high'
  createdAt: string
}

export function createSettlementRoute(
  transport: SettlementRoute['transport'],
  priority: SettlementRoute['priority'] = 'standard'
): SettlementRoute {
  return {
    routeId: crypto.randomUUID(),
    network: 'solana',
    transport,
    priority,
    createdAt: new Date().toISOString()
  }
}
