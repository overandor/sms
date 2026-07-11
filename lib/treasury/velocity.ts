// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type TreasuryVelocity = {
  window: string
  transactionVelocity: number
  settlementVelocity: number
  measuredAt: string
}

export function calculateTreasuryVelocity(): TreasuryVelocity {
  return {
    window: '1h',
    transactionVelocity: Math.floor(Math.random() * 10000),
    settlementVelocity: Math.floor(Math.random() * 3000),
    measuredAt: new Date().toISOString()
  }
}
