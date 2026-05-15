import { getLiquidityMesh } from '@/lib/federation/liquidityMesh'

export type LiquidityBalanceDecision = {
  decisionId: string
  targetRegion: string
  rebalanceAmount: number
  executedAt: string
}

export function generateLiquidityBalanceDecision() {
  const mesh = getLiquidityMesh()

  const sorted = [...mesh].sort(
    (a, b) => a.availableLiquidity - b.availableLiquidity
  )

  const target = sorted[0]

  return {
    decisionId: crypto.randomUUID(),
    targetRegion: target?.region ?? 'fallback-region',
    rebalanceAmount: 250000,
    executedAt: new Date().toISOString()
  }
}
