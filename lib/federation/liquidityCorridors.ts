// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type LiquidityCorridor = {
  corridorId: string
  sourceRegion: string
  destinationRegion: string
  throughputCapacity: number
  congestionIndex: number
  synchronizedAt: string
}

const liquidityCorridors: LiquidityCorridor[] = []

export function createLiquidityCorridor(
  sourceRegion: string,
  destinationRegion: string,
  throughputCapacity: number
) {
  const corridor: LiquidityCorridor = {
    corridorId: crypto.randomUUID(),
    sourceRegion,
    destinationRegion,
    throughputCapacity,
    congestionIndex: 0,
    synchronizedAt: new Date().toISOString()
  }

  liquidityCorridors.push(corridor)

  return corridor
}

export function getLiquidityCorridors() {
  return liquidityCorridors
}
