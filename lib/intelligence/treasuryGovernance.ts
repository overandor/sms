export type TreasuryGovernanceDecision = {
  governanceId: string
  proposal: string
  validatorApprovals: number
  accepted: boolean
  finalizedAt: string
}

export function resolveTreasuryGovernance(
  proposal: string,
  validatorApprovals: number,
  threshold = 5
): TreasuryGovernanceDecision {
  return {
    governanceId: crypto.randomUUID(),
    proposal,
    validatorApprovals,
    accepted: validatorApprovals >= threshold,
    finalizedAt: new Date().toISOString()
  }
}
