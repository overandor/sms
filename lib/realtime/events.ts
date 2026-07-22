// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type TreasuryEvent = {
  id: string
  type:
    | 'claim_issued'
    | 'claim_redeemed'
    | 'bundle_submitted'
    | 'reserve_updated'

  timestamp: string
  payload: Record<string, unknown>
}

const eventStream: TreasuryEvent[] = []

export function emitTreasuryEvent(
  event: Omit<TreasuryEvent, 'id' | 'timestamp'>
) {
  const treasuryEvent: TreasuryEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...event
  }

  eventStream.unshift(treasuryEvent)

  return treasuryEvent
}

export function getTreasuryEvents() {
  return eventStream.slice(0, 50)
}
