// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type TreasurySignature = {
  signatureId: string
  signer: string
  createdAt: string
}

export function signTreasuryInstruction(signer: string): TreasurySignature {
  return {
    signatureId: crypto.randomUUID(),
    signer,
    createdAt: new Date().toISOString()
  }
}
