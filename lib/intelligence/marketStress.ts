export type MarketStressScenario = {
  scenarioId: string
  marketVolatility: number
  reservePressure: number
  corridorCongestion: number
  generatedAt: string
}

export function simulateMarketStress(
  marketVolatility: number,
  reservePressure: number,
  corridorCongestion: number
): MarketStressScenario {
  return {
    scenarioId: crypto.randomUUID(),
    marketVolatility,
    reservePressure,
    corridorCongestion,
    generatedAt: new Date().toISOString()
  }
}
