export type TreasuryRebalance = {
  rebalanceId: string
  asset: string
  amount: number
  targetVault: string
  executedAt: string
}

export function executeTreasuryRebalance(
  asset: string,
  amount: number,
  targetVault: string
): TreasuryRebalance {
  return {
    rebalanceId: crypto.randomUUID(),
    asset,
    amount,
    targetVault,
    executedAt: new Date().toISOString()
  }
}
