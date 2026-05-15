export type StressScenario = {
  scenarioId: string
  reserveDrawdown: number
  merchantOutflow: number
  resultingCoverage: number
  simulatedAt: string
}

export function simulateTreasuryStress(
  reserveDrawdown: number,
  merchantOutflow: number
): StressScenario {
  const baseCoverage = 1.24
  const resultingCoverage = Number(
    Math.max(0.1, baseCoverage - reserveDrawdown / 100 - merchantOutflow / 200)
      .toFixed(2)
  )

  return {
    scenarioId: crypto.randomUUID(),
    reserveDrawdown,
    merchantOutflow,
    resultingCoverage,
    simulatedAt: new Date().toISOString()
  }
}
