export type LiquiditySnapshot = {
  treasuryLiquidity: number
  merchantLiquidity: number
  reserveCoverage: number
  generatedAt: string
}

export function calculateLiquidityState(): LiquiditySnapshot {
  const treasuryLiquidity = 4200000
  const merchantLiquidity = 1380000

  return {
    treasuryLiquidity,
    merchantLiquidity,
    reserveCoverage: Number(
      (treasuryLiquidity / merchantLiquidity).toFixed(2)
    ),
    generatedAt: new Date().toISOString()
  }
}
