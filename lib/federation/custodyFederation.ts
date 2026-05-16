export type CustodyFederationNode = {
  nodeId: string
  custodyRegion: string
  managedVaults: number
  synchronizedReserves: number
  updatedAt: string
}

const custodyFederation: CustodyFederationNode[] = []

export function registerCustodyFederationNode(
  custodyRegion: string,
  managedVaults: number,
  synchronizedReserves: number
) {
  const node: CustodyFederationNode = {
    nodeId: crypto.randomUUID(),
    custodyRegion,
    managedVaults,
    synchronizedReserves,
    updatedAt: new Date().toISOString()
  }

  custodyFederation.push(node)

  return node
}

export function getCustodyFederation() {
  return custodyFederation
}
