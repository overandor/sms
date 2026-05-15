export type RiskSignal = {
  signalId: string
  category:
    | 'liquidity'
    | 'settlement'
    | 'merchant'
    | 'consensus'
    | 'reserve'

  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  generatedAt: string
}

export function generateRiskSignal(
  category: RiskSignal['category'],
  severity: RiskSignal['severity'],
  confidence: number
): RiskSignal {
  return {
    signalId: crypto.randomUUID(),
    category,
    severity,
    confidence,
    generatedAt: new Date().toISOString()
  }
}
