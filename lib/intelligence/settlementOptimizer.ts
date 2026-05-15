export type SettlementOptimization = {
  optimizationId: string
  selectedPath: 'sms' | 'qr' | 'nfc'
  estimatedLatency: number
  estimatedLiquidityCost: number
  optimizedAt: string
}

export function optimizeSettlement(
  congestionScore: number,
  liquidityPressure: number
): SettlementOptimization {
  const selectedPath =
    congestionScore > 70 ? 'qr' : congestionScore > 40 ? 'nfc' : 'sms'

  return {
    optimizationId: crypto.randomUUID(),
    selectedPath,
    estimatedLatency: Math.max(40, 300 - congestionScore),
    estimatedLiquidityCost: liquidityPressure * 0.82,
    optimizedAt: new Date().toISOString()
  }
}
