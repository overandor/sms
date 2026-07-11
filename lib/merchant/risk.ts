// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type MerchantRiskProfile = {
  merchantId: string
  score: number
  velocity: number
  flagged: boolean
}

export function evaluateMerchantRisk(
  merchantId: string,
  velocity: number
): MerchantRiskProfile {
  const score = Math.max(1, 100 - velocity)

  return {
    merchantId,
    velocity,
    score,
    flagged: score < 40
  }
}
