import { generateTreasuryDecision } from './treasuryAI'
import { generateLiquidityBalanceDecision } from './liquidityBalancer'

export type AutonomousTreasuryAction = {
  actionId: string
  treasuryStrategy: string
  liquidityAction: string
  generatedAt: string
}

export function executeAutonomousTreasuryCycle(): AutonomousTreasuryAction {
  const treasuryDecision = generateTreasuryDecision()
  const liquidityDecision = generateLiquidityBalanceDecision()

  return {
    actionId: crypto.randomUUID(),
    treasuryStrategy: treasuryDecision.strategy,
    liquidityAction: `rebalance_${liquidityDecision.targetRegion}`,
    generatedAt: new Date().toISOString()
  }
}
