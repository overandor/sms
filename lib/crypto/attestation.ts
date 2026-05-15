export type TreasuryAttestation = {
  attestationId: string
  auditor: string
  reserveRatio: number
  signedAt: string
}

export function createTreasuryAttestation(
  auditor: string,
  reserveRatio: number
): TreasuryAttestation {
  return {
    attestationId: crypto.randomUUID(),
    auditor,
    reserveRatio,
    signedAt: new Date().toISOString()
  }
}
