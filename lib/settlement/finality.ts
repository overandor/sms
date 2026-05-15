export type FinalityState = 'created' | 'queued' | 'submitted' | 'confirmed' | 'finalized' | 'failed'

export type SettlementFinality = {
  settlementId: string
  state: FinalityState
  confirmations: number
  updatedAt: string
}

export function createFinalityRecord(): SettlementFinality {
  return {
    settlementId: crypto.randomUUID(),
    state: 'created',
    confirmations: 0,
    updatedAt: new Date().toISOString()
  }
}

export function advanceFinality(
  record: SettlementFinality,
  state: FinalityState,
  confirmations = record.confirmations
): SettlementFinality {
  return {
    ...record,
    state,
    confirmations,
    updatedAt: new Date().toISOString()
  }
}
