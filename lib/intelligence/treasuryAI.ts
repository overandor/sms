// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
import { generateRiskSignal } from './riskSignals'
import { generateLiquidityForecast } from './liquidityForecast'

export type TreasuryDecision = {
  decisionId: string
  strategy: string
  confidence: number
  generatedAt: string
}

export function generateTreasuryDecision() {
  const forecast = generateLiquidityForecast(5200000, 0.91)

  generateRiskSignal('liquidity', 'medium', 0.74)

  return {
    decisionId: crypto.randomUUID(),
    strategy:
      forecast.projectedLiquidity > 5000000
        ? 'expand_settlement_capacity'
        : 'increase_reserve_retention',
    confidence: forecast.confidence,
    generatedAt: new Date().toISOString()
  }
}
