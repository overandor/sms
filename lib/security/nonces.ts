// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
const nonceMemory = new Set<string>()

export type NonceIssue = {
  nonce: string
  issuedAt: string
}

export function issueNonce(): NonceIssue {
  const nonce = crypto.randomUUID()
  nonceMemory.add(nonce)

  return {
    nonce,
    issuedAt: new Date().toISOString()
  }
}

export function consumeNonce(nonce: string) {
  if (!nonceMemory.has(nonce)) {
    return {
      valid: false,
      reason: 'nonce_not_found_or_already_consumed'
    }
  }

  nonceMemory.delete(nonce)

  return {
    valid: true,
    reason: 'nonce_consumed'
  }
}
