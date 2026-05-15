export type SettlementBundle = {
  bundleId: string
  claimIds: string[]
  executionState: 'queued' | 'submitted' | 'settled'
  submittedAt: string
}

export function createSettlementBundle(claimIds: string[]): SettlementBundle {
  return {
    bundleId: crypto.randomUUID(),
    claimIds,
    executionState: 'queued',
    submittedAt: new Date().toISOString()
  }
}
