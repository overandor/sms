export type CrossBorderTransfer = {
  transferId: string
  originJurisdiction: string
  destinationJurisdiction: string
  settlementAsset: string
  value: number
  routedAt: string
}

export function routeCrossBorderTransfer(
  originJurisdiction: string,
  destinationJurisdiction: string,
  settlementAsset: string,
  value: number
): CrossBorderTransfer {
  return {
    transferId: crypto.randomUUID(),
    originJurisdiction,
    destinationJurisdiction,
    settlementAsset,
    value,
    routedAt: new Date().toISOString()
  }
}
