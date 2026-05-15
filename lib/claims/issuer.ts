export type ClaimIssueInput = {
  recipient: string
  denomination: string
  asset: string
  channel: 'sms' | 'qr' | 'nfc' | 'email' | 'link'
}

export type IssuedClaim = {
  claimId: string
  claimLink: string
  recipient: string
  denomination: string
  asset: string
  channel: ClaimIssueInput['channel']
  status: 'pending'
  issuedAt: string
  expiresAt: string
}

export function issueClaim(input: ClaimIssueInput): IssuedClaim {
  const claimId = crypto.randomUUID()
  const issuedAt = new Date()
  const expiresAt = new Date(issuedAt.getTime() + 1000 * 60 * 30)

  return {
    claimId,
    claimLink: `/claim/${claimId}`,
    recipient: input.recipient,
    denomination: input.denomination,
    asset: input.asset,
    channel: input.channel,
    status: 'pending',
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString()
  }
}
