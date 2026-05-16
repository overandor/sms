export type SovereignReserveNode = {
  nodeId: string
  jurisdiction: string
  reserveVolume: number
  liquidityScore: number
  validatorParticipation: number
}

const sovereignReserveGrid: SovereignReserveNode[] = []

export function registerSovereignReserveNode(
  jurisdiction: string,
  reserveVolume: number,
  liquidityScore: number,
  validatorParticipation: number
) {
  const node: SovereignReserveNode = {
    nodeId: crypto.randomUUID(),
    jurisdiction,
    reserveVolume,
    liquidityScore,
    validatorParticipation
  }

  sovereignReserveGrid.push(node)

  return node
}

export function getSovereignReserveGrid() {
  return sovereignReserveGrid
}
