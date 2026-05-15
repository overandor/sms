export type LiquidityNode = {
  nodeId: string
  region: string
  availableLiquidity: number
  reserveCoverage: number
}

const liquidityMesh: LiquidityNode[] = []

export function registerLiquidityNode(
  region: string,
  availableLiquidity: number,
  reserveCoverage: number
) {
  const node: LiquidityNode = {
    nodeId: crypto.randomUUID(),
    region,
    availableLiquidity,
    reserveCoverage
  }

  liquidityMesh.push(node)

  return node
}

export function getLiquidityMesh() {
  return liquidityMesh
}
