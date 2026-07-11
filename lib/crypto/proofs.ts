// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type ProofEnvelope = {
  proofId: string
  subject: string
  commitment: string
  createdAt: string
}

export function createProofEnvelope(
  subject: string,
  commitment: string
): ProofEnvelope {
  return {
    proofId: crypto.randomUUID(),
    subject,
    commitment,
    createdAt: new Date().toISOString()
  }
}

export function verifyProofEnvelope(proof: ProofEnvelope) {
  return {
    proofId: proof.proofId,
    valid: Boolean(proof.subject && proof.commitment),
    verifiedAt: new Date().toISOString()
  }
}
