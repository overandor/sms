// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type SignatureNode = {
  nodeId: string
  signer: string
  signature: string
  propagatedAt: string
}

export function propagateSignature(
  signer: string,
  signature: string
): SignatureNode {
  return {
    nodeId: crypto.randomUUID(),
    signer,
    signature,
    propagatedAt: new Date().toISOString()
  }
}
