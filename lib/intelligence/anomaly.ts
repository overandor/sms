export type TreasuryAnomaly = {
  anomalyId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  signal: string
  detectedAt: string
}

export function detectTreasuryAnomaly(
  signal: string,
  severity: TreasuryAnomaly['severity']
): TreasuryAnomaly {
  return {
    anomalyId: crypto.randomUUID(),
    severity,
    signal,
    detectedAt: new Date().toISOString()
  }
}
