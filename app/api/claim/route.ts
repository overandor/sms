import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const claimId = crypto.randomUUID()
  const token = crypto.randomUUID() // Added secure redemption token

  const payload = {
    recipient: body.recipient,
    denomination: body.denomination,
    asset: body.asset,
    claimId,
    token, // Include token in payload
    status: 'pending',
    issuedAt: new Date().toISOString(),
    claimLink: `https://membra.app/redeem/${claimId}?token=${token}`, // Changed to redeem link with token
    smsPreview: `You received ${body.denomination} ${body.asset} via MEMBRA. Redeem: https://membra.app/redeem/${claimId}?token=${token}`
  }

  return NextResponse.json(payload)
}