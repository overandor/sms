import { getTreasuryEvents } from './events'

export function createSettlementFeed() {
  const events = getTreasuryEvents()

  return {
    feedId: crypto.randomUUID(),
    events,
    generatedAt: new Date().toISOString()
  }
}
