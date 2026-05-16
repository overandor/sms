export type SystemicRiskSnapshot = {
  snapshotId: string
  reserveStress: number
  corridorCongestion: number
  validatorInstability: number
  systemicRiskIndex: number
  generatedAt: string
}

export function generateSystemicRiskSnapshot(
  reserveStress: number,
  corridorCongestion: number,
  validatorInstability: number
): SystemicRiskSnapshot {
  const systemicRiskIndex = Number(
    (
      reserveStress * 0.4 +
      corridorCongestion * 0.35 +
      validatorInstability * 0.25
    ).toFixed(2)
  )

  return {
    snapshotId: crypto.randomUUID(),
    reserveStress,
    corridorCongestion,
    validatorInstability,
    systemicRiskIndex,
    generatedAt: new Date().toISOString()
  }
}
