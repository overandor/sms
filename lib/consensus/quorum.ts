export type QuorumVote = {
  validatorId: string
  approved: boolean
  votedAt: string
}

export type QuorumResult = {
  quorumId: string
  approvals: number
  rejections: number
  threshold: number
  reached: boolean
  finalizedAt: string
}

export function resolveQuorum(
  votes: QuorumVote[],
  threshold = 3
): QuorumResult {
  const approvals = votes.filter((vote) => vote.approved).length
  const rejections = votes.length - approvals

  return {
    quorumId: crypto.randomUUID(),
    approvals,
    rejections,
    threshold,
    reached: approvals >= threshold,
    finalizedAt: new Date().toISOString()
  }
}
