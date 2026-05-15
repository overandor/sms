export type TreasuryRegion = {
  regionId: string
  jurisdiction: string
  reserveCapacity: number
  activeValidators: number
}

const regionMesh: TreasuryRegion[] = []

export function registerTreasuryRegion(
  jurisdiction: string,
  reserveCapacity: number,
  activeValidators: number
) {
  const region: TreasuryRegion = {
    regionId: crypto.randomUUID(),
    jurisdiction,
    reserveCapacity,
    activeValidators
  }

  regionMesh.push(region)

  return region
}

export function getTreasuryRegions() {
  return regionMesh
}
