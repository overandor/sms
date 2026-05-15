export type TreasuryFlowPrediction = {
  predictionId: string
  projectedInbound: number
  projectedOutbound: number
  confidence: number
  generatedAt: string
}

export function predictTreasuryFlow(
  projectedInbound: number,
  projectedOutbound: number,
  confidence: number
): TreasuryFlowPrediction {
  return {
    predictionId: crypto.randomUUID(),
    projectedInbound,
    projectedOutbound,
    confidence,
    generatedAt: new Date().toISOString()
  }
}
