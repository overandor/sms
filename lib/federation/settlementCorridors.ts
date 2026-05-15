export type SettlementCorridor = {
  corridorId: string
  sourceRegion: string
  targetRegion: string
  liquidityLimit: number
  active: boolean
}

const settlementCorridors: SettlementCorridor[] = []

export function createSettlementCorridor(
  sourceRegion: string,
  targetRegion: string,
  liquidityLimit: number
) {
  const corridor: SettlementCorridor = {
    corridorId: crypto.randomUUID(),
    sourceRegion,
    targetRegion,
    liquidityLimit,
    active: true
  }

  settlementCorridors.push(corridor)

  return corridor
}

export function getSettlementCorridors() {
  return settlementCorridors
}
