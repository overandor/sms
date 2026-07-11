// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
import { getTreasuryEvents } from './events'

export function createSettlementFeed() {
  const events = getTreasuryEvents()

  return {
    feedId: crypto.randomUUID(),
    events,
    generatedAt: new Date().toISOString()
  }
}
