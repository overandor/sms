import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const claimId = crypto.randomUUID()

  const payload = {
    recipient: body.recipient,
    denomination: body.denomination,
    asset: body.asset,
    claimId,
    status: 'pending',
    issuedAt: new Date().toISOString(),
    claimLink: `https://membra.app/claim/${claimId}`,
    smsPreview: `You received ${body.denomination} ${body.asset} via MEMBRA. Claim: https://membra.app/claim/${claimId}`
  }

  return NextResponse.json(payload)
}
