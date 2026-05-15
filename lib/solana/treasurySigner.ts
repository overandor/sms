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
