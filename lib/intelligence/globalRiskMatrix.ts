// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type GlobalRiskNode = {
  jurisdiction: string
  reserveRisk: number
  settlementRisk: number
  liquidityRisk: number
}

export function generateGlobalRiskMatrix(): GlobalRiskNode[] {
  return [
    {
      jurisdiction: 'NA',
      reserveRisk: 0.18,
      settlementRisk: 0.14,
      liquidityRisk: 0.22
    },
    {
      jurisdiction: 'EU',
      reserveRisk: 0.21,
      settlementRisk: 0.17,
      liquidityRisk: 0.2
    },
    {
      jurisdiction: 'APAC',
      reserveRisk: 0.27,
      settlementRisk: 0.24,
      liquidityRisk: 0.31
    }
  ]
}
