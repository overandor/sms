// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type ReserveVault = {
  vaultId: string
  asset: string
  custodyAddress: string
  balance: number
  updatedAt: string
}

export function createReserveVault(asset: string): ReserveVault {
  return {
    vaultId: crypto.randomUUID(),
    asset,
    custodyAddress: crypto.randomUUID(),
    balance: 0,
    updatedAt: new Date().toISOString()
  }
}
