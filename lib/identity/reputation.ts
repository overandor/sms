// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type ReputationProfile = {
  identityId: string
  score: number
  verified: boolean
  updatedAt: string
}

export function generateReputation(identityId: string): ReputationProfile {
  const score = Math.floor(Math.random() * 40) + 60

  return {
    identityId,
    score,
    verified: score > 70,
    updatedAt: new Date().toISOString()
  }
}
